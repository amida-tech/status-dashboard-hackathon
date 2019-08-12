module.exports = {
  messagesTableSchema: {
    TableName: process.env.MESSAGES_TABLE,
    AttributeDefinitions: [
      {
        AttributeName: 'TIMESTAMP',
        AttributeType: 'S',
      },
      {
        AttributeName: 'CHANNEL',
        AttributeType: 'S',
      },
      {
        AttributeName: 'ITEM_USER',
        AttributeType: 'S'
      },
      {
        AttributeName: 'MESSAGE',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'ITEM_USER',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'TIMESTAMP',
        KeyType: 'RANGE',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1, 
      WriteCapacityUnits: 1
    },
    BillingMode: 'PROVISIONED'
  },
  wfhTableSchema: {
    TableName: process.env.WFH_TABLE,
    AttributeDefinitions: [
      {
        AttributeName: 'START_DATE',
        AttributeType: 'S',
      },
      {
        AttributeName: 'EMAIL',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'EMAIL',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'START_DATE',
        KeyType: 'RANGE',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1, 
      WriteCapacityUnits: 1
    },
    BillingMode: 'PROVISIONED'
  }
}
