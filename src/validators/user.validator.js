import Joi from '../utils/joi';

export const ENUMS = {
  SCOPES: ['ADMIN', 'USER'],
};

export const create = {
  body: {
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    scope: Joi.string().valid(ENUMS.SCOPES),
  },
};

export const signin = {
  body: {
    email: Joi.string().required(),
    password: Joi.string().required(),
  },
};
