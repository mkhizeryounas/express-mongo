import express from 'express';
import multer from '../middlewares/multer';
import validate from 'express-validation';
import * as uploadController from '../controllers/upload/upload.controller';
import * as uploadValidator from '../controllers/upload/upload.validator';
import uuid4 from 'uuid4';

const router = express.Router();

router.post('/', [multer.single('_file')], async (req, res, next) => {
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

router.post(
  '/pre-signed',
  [validate(uploadValidator.preSigned)],
  async (req, res, next) => {
    try {
      const url = uploadController.presignedUrl({ ...req.body });
      return res.reply({
        data: {
          url,
          fileId: uuid4(),
        },
      });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
