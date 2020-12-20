import jwt from 'jsonwebtoken';
import common from './common';
import { secret as cert } from '../config/keys';

const data = {
  unlock: (request, response, next) => {
    let authHeader = request.headers['authorization'] || '';
    if (typeof authHeader !== 'undefined' && authHeader.includes('Bearer ')) {
      authHeader = authHeader.substring(7);
      jwt.verify(authHeader, cert, (err, decode) => {
        try {
          if (err) {
            throw authHeader;
          }
          request.user = decode;
          return next();
        } catch (error) {
          return response.reply({ statusCode: 401, data: error });
        }
      });
    } else {
      return response.reply({ statusCode: 401 });
    }
  },
  lock: (obj) => {
    obj['iat'] = common.time();
    // obj["exp"] = common.time() + 60 * 60 * 24;
    obj['access_token'] = jwt.sign(obj, cert);
    return obj;
  },
};

export default data;
