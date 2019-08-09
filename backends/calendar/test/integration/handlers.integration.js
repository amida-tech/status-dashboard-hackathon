require('env-yaml').config({path: __dirname + '/../serverless.env-test.yml'});
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');
const get = require('lodash/get');
const putReactionData = require('../../examples/addReactionHouse.json').index;
const messageHandler = require('../../handlers/postDailyMessage').index;
const wfhListenerHandler = require('../../handlers/wfhListener').index;
const dailyMessageHandler = require('../../handlers/postDailyMessage').index;
const controller = require('../../controller');

const { setUpDynamodb } = require('../test-helper');

chai.use(chaiAsPromised);

const { expect } = chai;

const testUserId = process.env.SLACK_USER_ID;
const testUserEmail = process.env.SLACK_USER_EMAIL;
const slackWFHChannel = process.env.SLACK_WFH_CHANNEL;
const slackBotUserId = process.env.WFH_BOT_SLACK_ID;
const message = "Hi! this is the work from home bot. You can place yourself on the work from home calendar, or let your teamates know that you'll be in the office today by selecting either the house :house: or office :office: emoji"



describe('Daily Message Handler', () => {
  before(async () => {
    try{
      await setUpDynamodb();
    } catch(err){
      console.error(err)
    }
  })
  it('Stores message timestamp/channel in dynamodb', async () => {
    let res = await dailyMessageHandler();
    expect(res.statusCode).to.equal(200);
    expect(res.channel).to.equal(slackWFHChannel);
    expect(res.message).to.equal(message);
    expect(res.timeStamp).to.exist;

    let item = await controller.getMessageByKey(res.channel, res.timeStamp);
      
    expect(get(item, 'CHANNEL.S')).to.equal(slackWFHChannel);
    expect(get(item, 'TIMESTAMP.S')).to.equal(res.timeStamp);

  });
});

describe('WFH Listener', () => {
  it('Adds event to wfh calendar & wfh table if message exists in messages table', async () => {
    let messageRes = await dailyMessageHandler();
    let reactionAddedHouse = {
      event: {
        type: reactionAdded,
        user: testUserId,
        item: {
          type: 'message',
          channel: slackWFHChannel,
          ts: '1564154225.014400',
          
        }
      }
    };
    await wfhListenerHandler();
  });
});
