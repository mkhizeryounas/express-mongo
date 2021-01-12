const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes = require('./src/config/routes');
require('./src/config/db');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(require('./src/middlewares/response'));
app.use(require('cors')());

routes(app);

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.reply({ statusCode: 404 });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log('ERROR:', err);
  if (err.isJoi || err.hasOwnProperty('errors') || err.name === 'MongoError') {
    err.status = 422;
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
});

module.exports = app;
