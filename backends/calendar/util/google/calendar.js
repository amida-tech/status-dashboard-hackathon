const { google } = require('googleapis');
let has = require('lodash/has');
const getAuth = require('./authorize');
const {
  getStartAndEndOfDateDateTime,
  getStartAndEndOfTodayDateTime,
  getStartAndEndOfDateDate,
  getStartAndEndOfTodayDate,
  validateDate
} = require('../time');

// Lists events for today or a given date
const listEvents = async(gCalId, date) => {
  if(date && !validateDate(date)) {
    //Eventually we can respond to user asking for proper format
    console.error("Invalid date string. Try one of the following formats: \"DD-MM-YYYY\", \"DD/MM/YYYY\"");
    throw new Error("Invalid date string. Try one of the following formats: \"DD-MM-YYYY\", \"DD/MM/YYYY\"");
  };

  const auth = getAuth();
  const {start, end } = date ? getStartAndEndOfDateDateTime(date) : getStartAndEndOfTodayDateTime();
  const maxResults = 100;
  const calendar = google.calendar({ version: 'v3', auth });
  
  try {
    let res =  await calendar.events.list({
      calendarId: gCalId,
      timeMin: start,
      timeMax: end,
      maxResults: maxResults,
      singleEvents: true,
      orderBy: 'startTime',
    });
    if(has(res, 'data.items')) {
      return res.data.items
    } else {
      return []
    }
  } catch(err) {
    console.error(err);
    throw new Error(err);
  }
}



const addToCal = async ({calendarId, attendees, summary, start, end}) => {
  const auth = getAuth();
  const calendar = google.calendar({ version: 'v3', auth });

  try {
    let res = await new Promise((res, rej) => { 
      calendar.events.insert({
        calendarId,
        requestBody: {
          summary: summary,
          start: {
            date: start,
          },
          end: {
            date: end,
          },
          attendees
        },
      }, (err, event) => {
        if(err) {
          rej(err)
        } else {
          res(event);
        }
      });
    });
  
    if(has(res, 'data')) {
      return res.data;
    } else {
      return({});
    }
  } catch(err) {
    console.error(err);
    throw new Error(err);
  }
  
};

const removeFromCal = async ({calendarId, eventId}) => {
  const auth = getAuth();
  const calendar = google.calendar({ version: 'v3', auth });
  
  try {
    await new Promise((res, rej) => { 
      calendar.events.delete({
        calendarId,
        eventId
      }, (err, data) => {
        if(err) {
          rej(err)
        } else {
          res(data);
        }
      });
    });
    
    // Method throws error on failure
    // so eventId is returned on success
    return eventId;
  } catch(err) {
    console.error(err)
    throw new Error(err);
  }
  
};

module.exports = {
  listEvents,
  addToCal,
  removeFromCal
}