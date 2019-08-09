const { messagesTableSchema, wfhTableSchema } = require('../util/tableSchema');
const { 
  clearEventsOneDay
} = require('../controller');
const { dynamodbConfig } = require('../awsConfig');
const AWSController = require('../util/aws/controller');
const awsController = new AWSController({
  dynamodb: dynamodbConfig
});
const testCalId = process.env.WFH_GCAL_ID;

const createTables = async () => {
  try {
    await awsController.dynamodb.createTable(messagesTableSchema);
    await awsController.dynamodb.createTable(wfhTableSchema);
  } catch(err) {
    console.error(err)
  }
}

const deleteTables = async () => {
  try{
    await awsController.dynamodb.deleteTable(
      {
        TableName: messagesTableSchema.TableName
      }
    );
    await awsController.dynamodb.deleteTable(
      {
        TableName: wfhTableSchema.TableName
      }
    );
  } catch(err) {
    console.error(err)
  }
}

const setUpDynamodb = async () => {
  try{
    await deleteTables();
    await createTables();
    await clearEventsOneDay(testCalId);
  }catch(err){
    console.error(err)
  }
};

module.exports = {
  setUpDynamodb
}