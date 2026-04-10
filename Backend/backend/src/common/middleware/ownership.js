const AppError = require('../errors/AppError');

/**
 * Ownership guard factory.
 * Verifies the authenticated user owns the requested resource's business.
 *
 * @param {Function} fetchBusinessOwnerId - async (req) => userId string
 */
const ownership = (fetchBusinessOwnerId) => {
  return async (req, _res, next) => {
    try {
      const ownerId = await fetchBusinessOwnerId(req);
      if (!ownerId) {
        return next(AppError.notFound('Resource not found'));
      }
      if (ownerId !== req.user.id) {
        return next(AppError.forbidden('You do not own this resource'));
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

/**
 * Role guard — restrict to specific roles.
 * @param  {...string} roles
 */
const authorize = (...roles) => {
  return (req, _res, next) => {
    if (!req.user) {
      return next(AppError.unauthorized());
    }
    if (!roles.includes(req.user.role)) {
      return next(AppError.forbidden(`Role '${req.user.role}' is not authorized for this action`));
    }
    next();
  };
};

module.exports = { ownership, authorize };
