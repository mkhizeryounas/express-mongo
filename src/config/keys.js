import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
  dotenv.config();
}

module.exports = {
  mongodb:
    process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/workify',
  secret: process.env.secret || 'c6aSsUzQBACrdWoWy6g7BkuxwKfkPbmB',
};
