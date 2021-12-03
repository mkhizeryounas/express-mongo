import express from 'express';

const router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    return res.reply({ data: { name: 'Batch controller' } });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
