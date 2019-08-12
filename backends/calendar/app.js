const fs = require('fs');
const controller = require('./controller')
const express = require('express');
const {wrapAsync} = require('@rimiti/express-async');
const app = express();

app.get('/gcal', wrapAsync(async function(req, res){
  let eventList;
  if(req.query.type === 'ooo') {
    eventList = await controller.listEventsOOO();
  } else if(req.query.type === 'wfh') {
    eventList = await controller.listEventsWFH();
  }
  // Load client secrets from a local file.
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log('*** eventList ***');
  console.log(eventList);
  res.json(eventList);
}))

const port = 3000;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
