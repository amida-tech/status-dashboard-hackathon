'use strict';
const controller = require('../controller')

module.exports.index = async (event, context) => {
    console.log("getEvents")

    let eventType = event['pathParameters']['type']
    let eventList = [];

    if(eventType === 'wfh') {
      eventList = await controller.listEventsWFH();
    } else if(eventType = 'ooo') {
      eventList = await controller.listEventsOOO();
    } else {
      return {
        statusCode: 400,
        message: "Incorrect Query Parameters"
      }
    }
    
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        eventList
      }),
    };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
