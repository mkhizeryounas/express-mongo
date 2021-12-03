import express from 'express';
import { name } from '../../package.json';
const router = express.Router();

router.get('/', async function (req, res) {
  res.reply({ data: { about: `${name} service is working fine` } });
});

module.exports = router;
