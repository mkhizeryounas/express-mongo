import axios from 'axios';
import { RECAPTCHA } from '../config/keys';

export default async (req, res, next) => {
  try {
    const token = req.body.token;
    const url = `${RECAPTCHA.VERIFY_URL}?secret=${RECAPTCHA.SECRET_KEY}&response=${token}`;
    let { data } = await axios.post(url);
    if (!data.success) {
      throw new Error('Invalid Captcha');
    }
    return next();
  } catch (err) {
    console.log('err', err.message);
    return next(err);
  }
};
