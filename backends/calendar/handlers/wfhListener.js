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
      const slackId = get(body, 'event.user');
      if(get(body, 'event.type') === 'reactionAdded') {
        let itemUser = get(body, 'event.item_user');
        if(controller.messageExists(itemItemUser)) {
          
        }
        if(itemsUser) {
          await controller.addToWFHCal(slackId);
        } else {
          response.status = 500;
          response.message = "No item user in reaction added event";
        }
      } else if(get(reqBody, 'event.type') === 'reactionRemoved') {
        await controller.removeFromWFHCal(slackId);
      }
    }
    
  } catch(err) { 
    console.error(err); 
    response.statusCode = 500
    response.message = "Internal server error."
  } 

  return response;
};
