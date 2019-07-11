const express = require('express');
const path = require('path');
const sls = require('serverless-http');

const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml',
];

const app = express();
app.use('/', express.static(path.join(__dirname, 'dist')));

module.exports.index = sls(app, {
  binary: binaryMimeTypes,
});
