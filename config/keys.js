if (process.env.NODE_ENV === 'production') require('dotenv').config();
module.exports = {
  mongodb: process.env.mongodb || 'mongodb://localhost:27017/webrtc',
  secret: process.env.secret || 'c6aSsUzQBACrdWoWy6g7BkuxwKfkPbmB',
};
