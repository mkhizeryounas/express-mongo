const express = require('express');
const router = express.Router();
const models = require('../config/models');
const locker = require('../src/modules/locker');

router.get('/me', locker.unlock, async function (req, res, next) {
  try {
    res.reply({ data: req.user });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async function (req, res, next) {
  try {
    let user = new models.User(req.body);
    user = await user.save();
    res.reply({ data: user });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async function (req, res, next) {
  try {
    let _user = await models.User.findOne({ email: req.body.email });
    _user = await _user.checkPassword(req.body.password);
    let accessTokenData = locker.lock(_user.toJSON());
    res.reply({ data: accessTokenData });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
