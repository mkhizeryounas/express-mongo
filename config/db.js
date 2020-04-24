var mongoose = require('mongoose');
var keys = require('./keys');

mongoose.connect(keys.mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
