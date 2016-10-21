var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var simpleApi = require('./routes/simpleapi');
var error = require ('./routes/error')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/today/simpleapi', simpleApi);

app.use ('*', error);

module.exports = app;
