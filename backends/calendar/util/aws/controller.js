// FIXME: Need to require only the sdk packages that
//        are needed by the current project. This
//        significantly reduces the lambda load time. 
//        e.g. const AWS = require('aws-sdk/clients/dynamodbClient');
//        for some reason this ^^ didn't work.
const AWS = require('aws-sdk');
const get = require('lodash/get');
const has = require('lodash/has');

class AWSController {

  /* 
    This class offers a layer of abstraction between
    the application and the AWS-SDK. This is helpful for
    grouping AWS logic, requiring only what's needed, 
    wrapping callbacks in promises, and provide any
    necessary additional functionality.
  */

  constructor(config) {
    
    if(config) {
      this.dynamodbClient = new AWS.DynamoDB(get(config, 'dynamodb') || {})
      // e.g. this.s3Client = new AWS.s3Client(get(config, 's3') || {})
      // ...etc
    }

    this.dynamodb = {

      putItem: (req) => this.dynamodbClient.putItem(req).promise(),
    
      getItem: async (req) => {
        try{
          let res = await this.dynamodbClient.getItem(req).promise()
          if(has(res, 'Item')) {
            return res.Item;
          }
        } catch(err){
          console.error(err)
        }  
      },
    
      deleteItem: async (req) => {
        let res = await this.dynamodbClient.deleteItem(req).promise();
        return Object.keys(res) === 0;
      },

      createTable: (req) => this.dynamodbClient.createTable(req).promise(),
      
      deleteTable: (req) => this.dynamodbClient.deleteTable(req).promise(),

      query: (req) => this.dynamodbClient.query(req).promise()
    }

    // this.s3 = {...}
    // ...etc
  }
  

}

module.exports = AWSController;