'use strict';

const controller = require('../controller')
const get = require('lodash/get');

module.exports.index = async (event, context) => {
  let response = {
    statusCode: 200
  };
  try {

    let body = JSON.parse(event.body);
    let challenge = get(body, 'challenge');

    if(challenge) {
      response.body = JSON.stringify({ challenge });
    } else {
      const slackId = get(reqBody, 'event.user');
      if(get(reqBody, 'event.type') === 'reactionAdded') {
        
        let res = await controller.addToWFHCal(slackId);
        
      } else if(get(reqBody, 'event.type') === 'reactionRemoved') {
        const slackId = get(reqBody, 'event.user');
        controller.removeFromWFHCal(slackId);
      }else if(get(reqBody, 'event.type') === 'channelMessage') {
        const slackId = get(reqBody, 'event.user');
        controller.removeFromWFHCal(slackId);
      }
    }
    
  } catch(err) { 
    console.error(err); 
    response.statusCode = 500
    response.message = "Internal server error."
  } 

  return response;
};
