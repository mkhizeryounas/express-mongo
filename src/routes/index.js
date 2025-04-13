import express from 'express';

const router = express.Router();

router.get('/', async function (req, res) {
  res.reply({
    data: {
      message: 'Hello World!',
    },
  });
});

module.exports = router;
