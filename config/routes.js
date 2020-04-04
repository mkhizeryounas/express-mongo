// Declare all routes in rote config file

const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');
const authRouter = require('../routes/auth');

module.exports = (app) => {
  app.use('/', indexRouter);
  app.use('/auth', authRouter);
  app.use('/users', usersRouter);
};
