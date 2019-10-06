const createError = require('http-errors');
const express = require('express');
const usersRouter = require('./routes/users');
var bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());


app.use('/users', usersRouter);
app.get('/', function(req, res, next) {
  res.send('Express App Start');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
