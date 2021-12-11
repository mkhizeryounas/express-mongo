import express from 'express';
import { unlock } from '../utils/locker';
import validate from 'express-validation';
import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';

const router = express.Router();

router.get('/me', unlock, async function (req, res, next) {
  try {
    return res.reply({ data: req.user });
  } catch (err) {
    return next(err);
  }
});

router.post(
  '/signup',
  validate(userValidator.create),
  async function (req, res, next) {
    try {
      return res.reply({ data: await userController.create(req.body) });
    } catch (err) {
      return next(err);
    }
  }
);

router.post(
  '/signin',
  validate(userValidator.signin),
  async function (req, res, next) {
    try {
      return res.reply({ data: await userController.signin(req.body) });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
