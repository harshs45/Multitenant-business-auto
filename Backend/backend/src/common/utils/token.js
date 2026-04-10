const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets');

/**
 * Generate an access token.
 */
const generateAccessToken = (user) => {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    secrets.jwtSecret(),
    { expiresIn: secrets.jwtExpiresIn() },
  );
};

/**
 * Generate a refresh token.
 */
const generateRefreshToken = (user) => {
  return jwt.sign(
    { sub: user.id, type: 'refresh' },
    secrets.jwtRefreshSecret(),
    { expiresIn: secrets.jwtRefreshExpiresIn() },
  );
};

/**
 * Verify a refresh token.
 */
const verifyRefreshToken = (token) => {
  return jwt.verify(token, secrets.jwtRefreshSecret());
};

module.exports = { generateAccessToken, generateRefreshToken, verifyRefreshToken };
