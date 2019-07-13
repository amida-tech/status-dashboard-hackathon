'use strict';

module.exports.index = async (event, context) => {

  let response = {
    statusCode: 200
  };
  if(event) {
    let reqBody = JSON.parse(event.body);
    let { challenge } =  reqBody
    if(challenge) {
      response.body = JSON.stringify({ challenge });
    } 
    console.log(event)
  }

  return response;

  

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
