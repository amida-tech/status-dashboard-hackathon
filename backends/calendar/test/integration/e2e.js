require('env-yaml').config({path: __dirname + '/../serverless.env-test.yml'});
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');
const get = require('lodash/get');
const wfhListenerHandler = require('../../handlers/wfhListener').index;
const dailyMessageHandler = require('../../handlers/postDailyMessage').index;
const controller = require('../../controller');

const { setUpTablesAndCalendar } = require('../test-helper');

chai.use(chaiAsPromised);

const { expect } = chai;

const testUserId = process.env.SLACK_USER_ID;
const testUserEmail = process.env.SLACK_USER_EMAIL;
const slackWFHChannel = process.env.SLACK_WFH_CHANNEL;
const slackBotUserId = process.env.WFH_BOT_SLACK_ID;
const message = "Hi! this is the work from home bot. You can place yourself on the work from home calendar, or let your teamates know that you'll be in the office today by selecting either the house :house: or office :office: emoji"



describe('E2E', () => {
  before(async () => {
    try{
      await setUpTablesAndCalendar();
    } catch(err){
      console.error(err)
    }
  })
  it('Creates a daily message', () => {

  });

  it('Adds WFH ReactionsAdded to calendar/', () => {

  });

  it('Does not store reactions to incorrect messages', () => {

  });
  
});
