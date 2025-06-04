import { SECRET } from '../config/keys';
import sha256 from 'sha256';

module.exports = {
  parse: (msg) => {
    return JSON.parse(JSON.stringify(msg));
  },
  time: () => {
    return Math.floor(new Date() / 1000);
  },
  hash: (str) => {
    return sha256(str + SECRET);
  },
  validate: async (obj, schema) => {
    try {
      return schema.parse(obj || {});
    } catch (error) {
      error.responseCode = 422;
      throw error;
    }
  },
};
