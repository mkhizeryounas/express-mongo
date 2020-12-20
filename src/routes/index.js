import express from 'express';
const router = express.Router();

router.get('/', async function (req, res) {
  res.reply({ data: { about: 'user management service is working fine' } });
});

module.exports = router;
