import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
  console.log(req.body);
  res.send('respond with a resource');
});

module.exports = router;
