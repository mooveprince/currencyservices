var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var currencyApi = require('./routes/currencyapi');
var error = require ('./routes/error')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/currency', currencyApi);

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

app.use ('*', error);

module.exports = app;
