import aws from 'aws-sdk';
import multer from 'multer';
import uuid4 from 'uuid4';
import { AWS as AWS_KEYS } from '../config/keys';
import path from 'path';

const s3Storage = require('multer-s3');

const spacesEndpoint = new aws.Endpoint(AWS_KEYS.ENDPOINT);

aws.config.update({
  accessKeyId: AWS_KEYS.ACCESS_KEY_ID,
  secretAccessKey: AWS_KEYS.SECRET_ACCESS_KEY,
});

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

export default multer({
  storage: s3Storage({
    s3: s3,
    bucket: AWS_KEYS.BUCKET,
    acl: 'public-read',
    key: function (request, file, cb) {
      let prefix = 'uploads/';
      cb(
        null,
        prefix +
          `${new Date().toLocaleDateString().split('/').reverse().join('/')}/` +
          uuid4() +
          path.extname(file.originalname)
      );
    },
    contentType: function (request, file, cb) {
      cb(null, file.mimetype);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 25, // 25MB
  },
});

// .array('_file', 200)
// .single('_file',)
