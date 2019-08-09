const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');


// NOTE: For now we can hard-code the scopes. If we ever have
// multiple APIs this will need to be passed in from each.

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

getTokenPath = () => {
  let tokenPath;
  if(process.env.STAGE === 'prod') {
    tokenPath =  process.cwd() + '/tmp/token.json';
  } else {
    tokenPath =  process.cwd() + '/token.json';
  }
  return tokenPath;
}

/**
 * Create google credentials from environment variables.
 * If multiple projects are created, this should be passed
 * in along with scope.
 */
const assembleCredentials = () => ({
  installed: {
    "client_id": process.env.GOOGLE_CLIENT_ID,
    "project_id": process.env.GOOGLE_PROJECT_ID,
    "auth_uri": process.env.GOOGLE_AUTH_URI,
    "token_uri": process.env.GOOGLE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
    "client_secret": process.env.GOOGLE_CLIENT_SECRET,
    "redirect_uris": process.env.GOOGLE_REDIRECT_URIS.split(',')
  }
})

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
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const authorize = (credentials, callback) => {
  const TOKEN_PATH = getTokenPath();
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  try {
    let tokenContent = fs.readFileSync(TOKEN_PATH)
    oAuth2Client.setCredentials(JSON.parse(tokenContent));
    return oAuth2Client;
  } catch (err) {
    console.error(err)
    return getAccessToken(oAuth2Client, callback);
  }
}
const getAuth  = () => {
  let credentials = assembleCredentials();
  return authorize(credentials);
}

module.exports = getAuth;
