"use strict";
const co = require('co');
const uuidv4 = require('uuidv4');
const AWSController = require('./util/aws/controller');
const { listEvents, addToCal, removeFromCal } = require('./util/google/calendar');
const { getInfoBySlackId, postMessage } = require('./util/slack');
const { dynamodbConfig } = require('./awsConfig');
const { wfhTableSchema, messagesTableSchema } = require('./util/tableSchema');
const some = require('lodash/some');
const has = require('lodash/has');
const get = require('lodash/get');
const {
  getStartAndEndOfDateDate,
  getStartAndEndOfTodayDate,
} = require('./util/time');
let x = process.env;
const awsController = new AWSController({
  dynamodb: dynamodbConfig
});


const listAvailabilityEvents = async (gCalId, date) => {
 
  try {
    let res = await listEvents(gCalId, date);
    
    const events = res.data.items;
    
    if (events && events.length) {
      console.log(`${events.length} upcoming events`);
      let eventObjects = events.map((e, i) => {
        let eventObject = {};
        eventObject.start = e.start.dateTime || e.start.date;
        eventObject.end = e.end.dateTime || e.end.date;
        eventObject.humanEnd = moment(eventObject.end).format('MMM Do');
        eventObject.machineEnd = moment(eventObject.end).format('X'); // unix timestamp for sorting
        eventObject.summary = e.summary;
        eventObject.eventId = e.id;

        let regExec = xregexp.exec(e.summary, /(\w*)(?:'s)? (PTO|OOO|remote|WFH)/i)
        if (!regExec) { return; }
        eventObject.name = regExec[1];
        eventObject.type = regExec[2];
        if(eventObject.type.toLowerCase() === 'ooo' || eventObject.type.toLowerCase() === 'pto') { 
          eventObject.type = 'OOO'; 
        }
        
        if(eventObject.type.toLowerCase() === 'remote') { 
          eventObject.type = 'REMOTE';
        }

        if(eventObject.type.toLowerCase() === 'wfh') {
          eventObject.type = 'WFH';
        }

        return eventObject;

      });

      // sort in ascending order by end date
      return eventObjects.sort((a, b) => a.machineEnd - b.machineEnd);
    } else {
      console.log('No upcoming events found.');
    }
  } catch(err) {
    console.error(err);
    throw new Error(err);
  }
}

const listEventsWFH = async (date) => {
  let gCalIdTravel = process.env.WFH_GCAL_ID
  try {
    return await listAvailabilityEvents(gCalIdTravel, date);
  } catch(err) {
    console.error(err);
    throw new Error(err);
  }
}

const listEventsOOO = async () => {
  let gCalIdWFH = process.env.TRAVEL_GCAL_ID
  try{
    return await listAvailabilityEvents(gCalIdWFH, date);
  } catch(err) {
    console.error(err);
    throw new Error(err);
  }
}

const hasWFHEvent = async ({email, start}) => {
  let req = {
    TableName: process.env.WFH_TABLE,
    Key: {
      START_DATE: {S: start},
      EMAIL: {S: email},
    }
  }
  try{
    let itemRes = await awsController.dynamodb.getItem(req);
    return !! itemRes;
  } catch(err) {
    console.error(err);
  }

}

const putInWFHTable = async ({slackId, email, eventId, start}) => {
  let req = {
    TableName: process.env.WFH_TABLE,
    Item: {
      START_DATE: {S: start},
      EMAIL: {S: email},
      SLACK_ID: {S: slackId},
      CAL_EVENT_ID: {S: eventId}
    }
  }
  return await awsController.dynamodb.putItem(req);
}

const addToWFHCal = async (slackId, date) => {

  const calendarId = process.env.WFH_GCAL_ID
  const { start, end } = date ? getStartAndEndOfDateDate(date) : getStartAndEndOfTodayDate()

  try {
    const { email, first_name } = await getInfoBySlackId(slackId);  
    const summary = first_name + ' WFH';
    const attendees = [ email ];
    let hasEvent = await hasWFHEvent({email, start});
    if(!hasEvent) {
      const res = await addToCal({calendarId, attendees, summary, start, end});
    
      if(res.status === 'confirmed') {
        console.error(`event created for ${email} with event ID: ${res.id}`)
        let eventId = res.id;
        await putInWFHTable({email, eventId, slackId, start})
        return res;
      } else {
        console.error(JSON.stringify({
          statusCode: res.status,
          message: res.message
        }, null, 2))
      }
    } else {
      console.error({
        msg:'WFH event already logged for this user',
        slackId,
        email
      })
      return;
    }
    
  } catch(err) {
    console.error(err);
    throw new Error(err);
  }
   
}

const removeFromWFHCal = async (slackId, date) => {
  const calendarId = process.env.WFH_GCAL_ID
  const { start } = date ? getStartAndEndOfDateDate(date) : getStartAndEndOfTodayDate()

  try {
    //First check if they're on the calendar for the specified date
    const { email } = await getInfoBySlackId(slackId);  
    let item = await awsController.dynamodb.getItem({
      TableName: wfhTableSchema.TableName,
      Key: {
        START_DATE: {S: start },
        EMAIL: {S: email },
      }
    });

    if(item) {
      const eventId = get(item, 'CAL_EVENT_ID.S');
      await removeFromCal({calendarId, eventId});
      await awsController.dynamodb.deleteItem({
        TableName: wfhTableSchema.TableName,
        Key: {
          START_DATE: {S: start },
          EMAIL: {S: email },
        }
      });

      return true;
    } else {
      console.error({
        msg: 'No event to delete for slack user',
        slackId,
        email
      })
    }

  } catch(err) {
    console.error(err);
    throw new Error(err);
  }
}

// Clears all events for given calendarId/date or today
// if date is undefined
const clearEventsOneDay = async(calendarId, date) => {
  try{
    const events = await listEvents(calendarId, date);
    if(events && events.length) {
      let promises = events.map(async event => {
        if(has(event, 'id')) {
          return await removeFromCal({calendarId, eventId: event.id});
        }
      });
      return await Promise.all(promises);
    }
  } catch(err) {
    console.error(err);
    throw new Error(err);
  }
}

// //Do we want the bot to be able to edit peoples' calendars?
// //Do we want the bot to do so even if able?
const addToUserCal = async (slackId, date) => {
  //Stub
}

const putInMessagesTable = async({ts, channel}) => {
  let req = {
    TableName: process.env.MESSAGES_TABLE,
    Item: {
      TIMESTAMP: {S: ts},
      CHANNEL: {S: channel},
      UUID: { S: uuidv4() }
    }
  }
  return await awsController.dynamodb.putItem(req);
}

const postDailyMessage = async (message) => {
  const slackWFHChannel = process.env.SLACK_WFH_CHANNEL;
  const slackBotUserId = process.env.WFH_BOT_SLACK_ID;
  return await postMessage(slackWFHChannel, message, slackBotUserId);
}

const getMessageByKey = async (channel, timeStamp) => {
  return await awsController.dynamodb.getItem({
    TableName: messagesTableSchema.TableName,
    Key: {
      CHANNEL: {S: channel },
      TIMESTAMP: { S: timeStamp },
    }
  });
}

module.exports = {
  listEventsOOO,
  listEventsWFH,
  addToWFHCal,
  removeFromWFHCal,
  clearEventsOneDay,
  putInMessagesTable,
  postDailyMessage,
  getMessageByKey 
}
