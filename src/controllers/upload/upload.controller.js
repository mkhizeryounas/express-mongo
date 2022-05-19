import s3 from '../../utils/s3';
import { AWS as AWS_KEYS } from '../../config/keys';
import logger from '../../utils/logger';

export const TTL = 60;

export const presignedUrl = ({ fileName, contentType: fileType }) => {
  const fileExtension = fileType.split('/')[1];
  if (!fileExtension) {
    throw new Error('Invalid content type');
  }
  const fileNameWithExtension = `${fileName}.${fileExtension}`;
  logger.debug({ fileExtension, fileNameWithExtension });
  const params = {
    Bucket: AWS_KEYS.BUCKET,
    Key: fileNameWithExtension,
    Expires: TTL,
    ContentType: fileType,
    ACL: 'public-read',
  };
  return s3.getSignedUrl('putObject', params);
};
