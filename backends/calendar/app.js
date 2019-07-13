const fs = require('fs');
const controller = require('./controller')
const express = require('express');
const {wrapAsync} = require('@rimiti/express-async');
const app = express();

app.get('/gcal/ooo', wrapAsync(async function (req, res) {
  // Load client secrets from a local file.
  res.setHeader("Access-Control-Allow-Origin", "*");
  let content = fs.readFileSync(process.cwd() + '/credentials.json');
  let auth = controller.authorize(JSON.parse(content));
  const gcalId = "amida-tech.com_9dugut48t480pb4qee57stskjs@group.calendar.google.com"
  eventList = await controller.listEvents(auth, gcalId);
  console.log('*** eventList ***');
  console.log(eventList);
  res.json(eventList);
}));

// Hackathon === Copypastathon
app.get('/gcal/wfh', wrapAsync(async function (req, res) {
  // Load client secrets from a local file.
  res.setHeader("Access-Control-Allow-Origin", "*");
  let content = fs.readFileSync(process.cwd() + '/credentials.json');
  let auth = controller.authorize(JSON.parse(content));
  const gcalId = "amida.com_jemhtrukfpict356ajn7lgv50g@group.calendar.google.com"
  eventList = await controller.listEvents(auth, gcalId);
  console.log('*** eventList ***');
  console.log(eventList);
  res.json(eventList);
}));

const port = 3000;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
