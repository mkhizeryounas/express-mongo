import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
  dotenv.config();
}

module.exports = {
  MONGO_CONNECTION_STRING:
    process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/commerce',
  SECRET: process.env.SECRET || 'c6aSsUzQBACrdWoWy6g7BkuxwKfkPbmB',
  BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
};
