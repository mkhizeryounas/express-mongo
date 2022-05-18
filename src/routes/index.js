import express from 'express';
import frontendOnlyRequest from '../middlewares/frontend-only-request';
import { RECAPTCHA } from '../config/keys';

const router = express.Router();

router.get('/', async function (req, res) {
  res.reply({
    data: {
      message: 'Hello World!',
    },
  });
});

// frontend-only-render
router.get('/secure', async function (req, res) {
  res.render('secure', {
    title: 'Secure',
    siteKey: RECAPTCHA.SITE_KEY,
  });
});

// frontend-only-request
router.post('/secure/sudmit', [frontendOnlyRequest], async function (req, res) {
  console.log('req.body', req.body);
  res.reply({
    data: {
      status: 'OK',
    },
  });
});

module.exports = router;
