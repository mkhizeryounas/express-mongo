import aws from 'aws-sdk';
import { AWS as AWS_KEYS } from '../config/keys';

const spacesEndpoint = new aws.Endpoint(AWS_KEYS.ENDPOINT);

aws.config.update({
  accessKeyId: AWS_KEYS.ACCESS_KEY_ID,
  secretAccessKey: AWS_KEYS.SECRET_ACCESS_KEY,
});

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  signatureVersion: 'v4',
});

export default s3;
