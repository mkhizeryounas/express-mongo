const express = require('express');
const router = express.Router();
const { User } = require('../config/models');

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.reply({ data: { title: 'Express' } });
});

module.exports = router;
