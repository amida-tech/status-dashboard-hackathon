/*
  This script sets up all AWS controller configuration
  Each configuration will be fed directly into the
  correspoding aws-sdk service constructor.
*/

let dynamodbConfig;
// let s3Config;
// etc...

if(process.env.STAGE === 'dev' && process.env.LOCAL_DYNAMODB_ENDPOINT) {
  dynamodbConfig = {
    region: 'localhost',
    endpoint: process.env.LOCAL_DYNAMODB_ENDPOINT,
  }
  // s3Config = {region: 'localhost }
  // etc...
} else {
  dynamodbConfig = {
    region: process.env.AWS_REGION,
  }
}


module.exports = {
  dynamodbConfig,
  // s3Config
  // etc...
}