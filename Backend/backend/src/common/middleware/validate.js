const { validationResult } = require('express-validator');
const AppError = require('../errors/AppError');

/**
 * Middleware that runs after express-validator chains.
 * If validation errors exist, returns 400 with structured error details.
 */
const validate = (req, _res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const details = errors.array().map((e) => ({
      field: e.path,
      message: e.msg,
      value: e.value,
    }));
    return next(AppError.badRequest('Validation failed', details));
  }
  next();
};

module.exports = validate;
