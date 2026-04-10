const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets');
const AppError = require('../errors/AppError');

/**
 * JWT authentication middleware.
 * Expects: Authorization: Bearer <token>
 * Attaches req.user = { id, email, role }
 */
const authenticate = (req, _res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      throw AppError.unauthorized('Missing or invalid authorization header');
    }

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, secrets.jwtSecret());

    req.user = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(AppError.unauthorized('Token expired'));
    }
    if (err.name === 'JsonWebTokenError') {
      return next(AppError.unauthorized('Invalid token'));
    }
    next(err);
  }
};

/**
 * Optional auth — attaches user if token present but doesn't fail if missing.
 */
const optionalAuth = (req, _res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) return next();

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, secrets.jwtSecret());
    req.user = { id: decoded.sub, email: decoded.email, role: decoded.role };
  } catch (_) {
    // silently ignore
  }
  next();
};

module.exports = { authenticate, optionalAuth };
