import mongoose from 'mongoose';
import { MONGO_CONNECTION_STRING } from '@/config/keys';

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
