require('env-yaml').config({path: process.cwd() + '/serverless.env.yml'});

const { messagesTableSchema, wfhTableSchema } = require('./tableSchema');

const AWSController = require('./aws/controller');
const awsController = new AWSController({
  dynamodb: {
    region: 'localhost',
    endpoint: process.env.LOCAL_DYNAMODB_ENDPOINT,
  }
});


awsController.dynamodb.createTable(messagesTableSchema).then(console.log)
awsController.dynamodb.createTable(wfhTableSchema).then(console.log)
