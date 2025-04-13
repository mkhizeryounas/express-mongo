const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('module-alias/register');

const app = express();

app.set('DB', require('./config/db'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(require('./middlewares/response'));
app.use(require('cors')());

app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.reply({ statusCode: 404 });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};
  if (err.isJoi || err.hasOwnProperty('errors') || err.name === 'MongoError') {
    err.status = 422;
  }
  if (err.name === 'ValidationError' && err?.errors?.map) {
    err.errors = err?.errors?.map((error) => error?.messages?.[0]);
  }

  res.reply({
    message: err.message,
    statusCode: err.status || 400,
    data: err.hasOwnProperty('errors')
      ? err.errors
      : err.name === 'MongoError'
      ? err
      : err.data,
  });
  next();
});

module.exports = app;
