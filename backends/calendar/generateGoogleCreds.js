"use strict";
require('dotenv').config()

/* This is a small script to be used for intializing
   the Google configuration. Calling the "list events"
   function (or any google api) initiates the quickstart 
   process if it hasn't yet been completed*/
   
let controller = require('./controller');

controller.listEventsWFH().then(console.log)