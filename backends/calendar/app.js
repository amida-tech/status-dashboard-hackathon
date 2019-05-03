const fs = require('fs');
const controller = require('./controller')
const express = require('express');
const {wrapAsync} = require('@rimiti/express-async');
const app = express();

app.get('/gcal', wrapAsync(async function (req, res) {
  // Load client secrets from a local file.
  res.setHeader("Access-Control-Allow-Origin", "*");
  let content = fs.readFileSync(process.cwd() + '/credentials.json');
  let auth = controller.authorize(JSON.parse(content));
  eventList = await controller.listEvents(auth);
  console.log('*** eventList ***');
  console.log(eventList);
  res.json(eventList);
}));

const port = 3000;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
