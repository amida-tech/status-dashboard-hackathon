const express = require('express');
const awsServerlessExpress = require('aws-serverless-express');
const path = require('path');

const app = express();

app.use('/', express.static(path.join(__dirname, 'dist')));


const server = awsServerlessExpress.createServer(app);


exports.index = (event, context) => { awsServerlessExpress.proxy(server, event, context); };
