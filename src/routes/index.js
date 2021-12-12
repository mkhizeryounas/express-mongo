import express from 'express';
import { name } from '../../package.json';
import multer from '../middlewares/multer';

const router = express.Router();

router.get('/', async function (req, res) {
  res.reply({ data: { about: `${name} service is working fine` } });
});

router.post('/upload', [multer.single('_file')], async (req, res, next) => {
  try {
    const { file } = req;
    if (file?.location && !file.location.startsWith('https://')) {
      file.location = `https://${file.location}`;
    }
    return res.reply({
      data: file,
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
