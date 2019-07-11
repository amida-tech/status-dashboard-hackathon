const { Nuxt } = require('nuxt');
const express = require('express');
const path = require('path');
const sls = require('serverless-http');
const config = require('../nuxt.config.js');

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

const nuxt = new Nuxt(config);
const app = express();
app.use('/_nuxt', express.static(path.join(__dirname, '.nuxt', 'dist')));

app.use(async (req, res) => {
  nuxt.hook('render:done', async () => {
    await nuxt.render(req, res);
  });
});
module.exports.index = sls(app, {
  binary: binaryMimeTypes,
});
