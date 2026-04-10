/**
 * Custom application error with HTTP status code.
 */
class AppError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;  // distinguish from programmer errors
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message, details) {
    return new AppError(message || 'Bad request', 400, details);
  }

  static unauthorized(message) {
    return new AppError(message || 'Unauthorized', 401);
  }

  static forbidden(message) {
    return new AppError(message || 'Access denied', 403);
  }

  static notFound(message) {
    return new AppError(message || 'Resource not found', 404);
  }

  static conflict(message) {
    return new AppError(message || 'Conflict', 409);
  }

  static tooMany(message) {
    return new AppError(message || 'Too many requests', 429);
  }

  static internal(message) {
    return new AppError(message || 'Internal server error', 500);
  }
}

module.exports = AppError;
