import express from 'express';
import locker from '../utils/locker';

const router = express.Router();

router.get('/me', locker.unlock, async function (req, res, next) {
  try {
    return res.reply({ data: req.user });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
