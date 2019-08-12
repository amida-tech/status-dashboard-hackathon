require('env-yaml').config({path: __dirname + '/../serverless.env-test.yml'});
const AWSController = require('../../util/aws/controller');
const { messagesTableSchema, wfhTableSchema } = require('../../util/tableSchema');
const chai = require('chai');
const { expect } = chai;


const awsController = new AWSController({
  dynamodb: {
    region: 'localhost',
    endpoint: process.env.LOCAL_DYNAMODB_ENDPOINT,
  },
});

// These tests require a dynamodb instance running on
// the specified local url formatted: '{http|https}://localhost:xxxx'

describe('Dynamodb functions', () => {

  const channel = 'slackChannelId'
  const messageDateTime = '01-01-2001';
  const messageUUID =  '1234';
  const itemUser = 'itemUserId'

  it('Successfully creates all tables', async () => {

    let resMessages = await awsController.dynamodb.createTable(messagesTableSchema);
    let resWFH = await awsController.dynamodb.createTable(wfhTableSchema);

    expect(resMessages.TableDescription).to.not.be.null;
    expect(resWFH.TableDescription).to.not.be.null;
  });

  it('Successfully puts an Item', async () => {
    const putReq = {
      TableName: messagesTableSchema.TableName,
      Item: {
        TIMESTAMP: {S: messageDateTime},
        CHANNEL: {S: channel},
        ITEMUSER: {S: itemUser },
        UUID: {S: messageUUID}
      }
    }
    let putRes = await awsController.dynamodb.putItem(putReq);
    expect(putRes).to.be.empty;

  });

  it('successfully gets an Item', async () => {
    let res = await awsController.dynamodb.getItem(
      {
        TableName: messagesTableSchema.TableName,
        Key: {
          TIMESTAMP: { S: messageDateTime },
          ITEMUSER: {S: itemUser }
        }
      }
    );
    expect(res).to.deep.equal({
      TIMESTAMP: { S: messageDateTime },
      CHANNEL: { S: channel },
      ITEMUSER: {S: itemUser },
      UUID: { S: messageUUID }
    })
  });

  it('successfully deletes an Item', async () => {
    let res = await awsController.dynamodb.deleteItem(
      {
        TableName: messagesTableSchema.TableName,
        Key: {
          CHANNEL: {S: channel},
          TIMESTAMP: { S: messageDateTime },
          ITEMUSER: {S: itemUser }
        }
      }
    );
    expect(res).to.be.true;
  })

  it('successfully deletes all tables', async () => {
    let resMessages = await awsController.dynamodb.deleteTable(
      {
        TableName: messagesTableSchema.TableName
      }
    );
    let resWFH = await awsController.dynamodb.deleteTable(
      {
        TableName: wfhTableSchema.TableName
      }
    );
    expect(resMessages.TableDescription).to.not.be.null;
    expect(resWFH.TableDescription).to.not.be.null;
  })
});
