const rateLimit = require('express-rate-limit');

/**
 * General API rate limiter.
 */
const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { message: 'Too many requests, please try again later' } },
});

/**
 * Strict rate limiter for auth endpoints.
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: parseInt(process.env.AUTH_RATE_LIMIT_MAX, 10) || 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { message: 'Too many login attempts, please try again later' } },
});

/**
 * Rate limiter for public chat endpoints.
 */
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: parseInt(process.env.CHAT_RATE_LIMIT_MAX, 10) || 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { message: 'Chat rate limit exceeded' } },
});

module.exports = { generalLimiter, authLimiter, chatLimiter };
