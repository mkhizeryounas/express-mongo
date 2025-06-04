import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import db from '@/config/db';
import responseMiddleware from '@/middlewares/response.middleware';
import cors from 'cors';
import routes from '@/routes';
import { adminJs, adminRouter } from '@/admin';

const app = express();

app.set('DB', db);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1);
app.use(adminJs.options.rootPath, adminRouter);
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(responseMiddleware);
app.use(cors());
app.use(express.json());
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.reply({ statusCode: 404 });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};
  if (err.hasOwnProperty('errors') || err.name === 'MongoError') {
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
