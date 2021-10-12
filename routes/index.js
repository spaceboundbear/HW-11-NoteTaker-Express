const express = require('express');
const api = require('./apiroutes');

const app = express();

app.use('/api', api);

module.exports = app;
