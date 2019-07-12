'use strict';
const fs = require('fs');
const controller = require('./controller')
let content = fs.readFileSync(process.cwd() + '/credentials.json');

module.exports.index = async (event, context) => {
    // Load client secrets from a local file.
    let auth = controller.authorize(JSON.parse(content));
    let eventList = await controller.listEvents(auth);
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
