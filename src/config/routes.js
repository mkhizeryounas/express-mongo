const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');

module.exports = (app) => {
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
};
