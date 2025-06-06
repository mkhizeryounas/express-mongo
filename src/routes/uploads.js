import express from 'express';
import multerMiddleware from '@/middlewares/multer.middleware';
import validate from 'express-validation';
import * as uploadController from '@/controllers/upload.controller';
import * as uploadValidator from '@/validators/upload.validator';
import uuid4 from 'uuid4';
import { unlock } from '@/utils/locker';
import { ValidationError } from 'express-validation';

const router = express.Router();

router.post(
  '/',
  [unlock, multerMiddleware.single('_file')],
  async (req, res, next) => {
    try {
      const { file } = req;
      if (!file) {
        throw new ValidationError(
          [
            {
              messages: ['"_file" is required'],
            },
          ],
          {}
        );
      }
      if (file?.location && !file.location.startsWith('https://')) {
        file.location = `https://${file.location}`;
      }
      return res.reply({
        data: file,
      });
    } catch (err) {
      return next(err);
    }
  }
);

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
