const AppError = require('../errors/AppError');

/**
 * Centralized error handler.
 * In production: hides stack traces and internal details.
 * In development: returns full error detail for debugging.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let details = err.details || null;

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 400;
    message = 'Validation error';
    details = err.errors ? err.errors.map((e) => ({ field: e.path, message: e.message })) : null;
  }

  // Log in development
  if (process.env.NODE_ENV !== 'production') {
    console.error('❌ Error:', err);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(details && { details }),
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    },
  });
};

module.exports = errorHandler;
