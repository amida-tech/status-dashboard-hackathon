"use strict";

const fs = require('fs');
const readline = require('readline');
const xregexp = require('xregexp')
const {google} = require('googleapis');
const dayjs = require('dayjs');
const advancedFormat = require('dayjs/plugin/advancedFormat');

dayjs.extend(advancedFormat);

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = process.cwd() + '/token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  try {
    let tokenContent = fs.readFileSync(TOKEN_PATH)
    oAuth2Client.setCredentials(JSON.parse(tokenContent));
    return oAuth2Client;
  } catch (err) {
      return getAccessToken(oAuth2Client, callback);
  }
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth) {

  //return object
  const returnArray = [];

  //constants
  const startOfDay = new Date();
  startOfDay.setHours(0,0,0,0);
  const endOfDay = new Date();
  endOfDay.setHours(23,59,59,0);
  const maxResults = 100;
  const outOfOfficeCalendarId = 'amida-tech.com_9dugut48t480pb4qee57stskjs@group.calendar.google.com';
  
const calendar = google.calendar({version: 'v3', auth});
  let res = await calendar.events.list({
    calendarId: outOfOfficeCalendarId,
    timeMin: startOfDay.toISOString(),
    timeMax: endOfDay.toISOString(),
    maxResults: maxResults,
    singleEvents: true,
    orderBy: 'startTime',
  })
  // if (err) return console.log('The API returned an error: ' + err);

  const events = res.data.items;
  if (events.length) {
    console.log(`${events.length} upcoming events`);
    events.map((e, i) => {
      let eventObject = {};
      eventObject.start = e.start.dateTime || e.start.date;
      eventObject.end = e.end.dateTime || e.end.date;
      eventObject.humanEnd = dayjs(eventObject.end).format('MMM Do');
      eventObject.summary = e.summary;

      let regExec = xregexp.exec(e.summary, /(\w*)(?:'s)? (PTO|OOO|remote)/i)
      if (!regExec) { return; }
      eventObject.name = regExec[1];
      eventObject.type = regExec[2];
      if (eventObject.type.toLowerCase() === 'oooo' || eventObject.type.toLowerCase() === 'pto') { eventObject.type = 'OOO'; }

      returnArray.push(eventObject);
    });
  } else {
    console.log('No upcoming events found.');
  }
  return await returnArray;
}

module.exports = { 
  authorize,
  listEvents
}
