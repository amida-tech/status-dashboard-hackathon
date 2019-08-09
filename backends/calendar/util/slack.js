const axios = require('axios');
const get = require('lodash/get');
const has = require('lodash/has');
const find = require('lodash/find');
const slackAPIURL = 'https://slack.com/api';
const token = process.env.SLACK_BOT_API_TOKEN



const getSlackIdByEmail =  async email => {
  let emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if(!typeof email === 'string' || !emailRegex.test(email)) {
    console.error(JSON.stringify({
      msg: 'Invalid value input into getSlackByEmail function',
      email
    }))
  }
  try {
    let res = await axios.get(`${slackAPIURL}/users.list?token=${token}`)
    if(res.status === 200 && has(res,'data.members')) {
      let member = find(res.data.members, member => {
        return get(member, 'profile.email') === email;
      });
      if(member.id) {
        return member.id;
      }
    }
  } catch(err) {
    console.error(err)
    throw new Error(err);
  }

}

const getInfoBySlackId = async slackId => {
  try{
    let res = await axios.get(`${slackAPIURL}/users.info?token=${token}&user=${slackId}`)
    if(res.status === 200 && get(res, 'data.ok')) {
      if(get(res, 'data.user.profile')) {
        let profile = res.data.user.profile;
        return profile
      } else {
        console.error(`slack user Info response for ${slackId} has no email`)
        console.error(json.stringify(res, null, 2));
        return;
      }

    } else {
      console.error(res)
      throw new Error(res);
    }
  } catch(err) {
    console.error(err)
    throw new Error(err);
  }
}

const postMessage = async (channel, msg, asUser) => {
  let url = `${slackAPIURL}/chat.postMessage?token=${token}&channel=${channel}&text=${msg}`;
  if(asUser) {
    url = url +  `&as_user=${asUser}`
  }
  try {
    
    let res = await axios.get(url)
    if(res.status === 200 && res.data) {
      return res.data;
    } else {
      throw new Error(res);
    }
  } catch(err) {
    console.error(err)
    throw new Error(err);
  }
 
}

module.exports = {
  getInfoBySlackId,
  postMessage,
  getSlackIdByEmail
}