import { ZodError } from 'zod';

const formatErrors = (error) => {
  return error.errors.map((e) => ({
    field: e.path.join('.'),
    location: e.path[0],
    messages: [e.message],
    types: [e.code],
  }));
};

const validate = (schema) => (req, res, next) => {
  try {
    if (schema.body) {
      req.body = schema.body.parse(req.body);
    }
    if (schema.params) {
      req.params = schema.params.parse(req.params);
    }
    if (schema.query) {
      req.query = schema.query.parse(req.query);
    }
    return next();
  } catch (err) {
    if (err instanceof ZodError) {
      return next({
        name: 'ValidationError',
        message: 'validation error',
        errors: formatErrors(err),
      });
    }
    return next(err);
  }
};

export default validate;
