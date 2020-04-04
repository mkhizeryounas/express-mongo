const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(req.body);
  res.send('respond with a resource');
});
router.post('/', function (req, res, next) {
  console.log(req);
  res.json(req.body);
});

module.exports = router;
