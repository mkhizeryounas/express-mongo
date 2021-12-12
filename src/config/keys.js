import dotenv from 'dotenv';
const { NODE_ENV } = process.env;

let dotenvFilePath = '.env';

if (NODE_ENV && NODE_ENV.toLowerCase() !== 'production') {
  dotenvFilePath += '.' + NODE_ENV.toLowerCase();
}

dotenv.config({
  path: dotenvFilePath,
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3000,
  MONGO_CONNECTION_STRING:
    process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/commerce',
  SECRET: process.env.SECRET || 'c6aSsUzQBACrdWoWy6g7BkuxwKfkPbmB',
  BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  AWS: {
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
    BUCKET: process.env.AWS_BUCKET || '',
    ENDPOINT: process.env.AWS_ENDPOINT || '',
  },
};
