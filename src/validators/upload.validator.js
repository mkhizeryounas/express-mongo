import Joi from '@/utils/joi';

export const preSigned = {
  body: {
    fileName: Joi.string().required(),
    contentType: Joi.string().required(),
  },
};
