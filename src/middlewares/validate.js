import { ValidationError } from '../errors/ValidationError.js';

export function validate(schema) {
  return (req, res, next) => {
    const details = [];

    if (schema.body) {
      const bodyErrors = schema.body(req.body);

      details.push(...bodyErrors);
    }

    if (schema.params) {
      const paramsErrors = schema.params(req.params);

      details.push(...paramsErrors);
    }

    if (schema.query) {
      const queryErrors = schema.query(req.query);

      details.push(...queryErrors);
    }

    if (details.length > 0) {
      return next(new ValidationError(details));
    }

    next();
  };
}