const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { User, RefreshToken, Subscription, AuditLog } = require('../../models');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../../common/utils/token');
const AppError = require('../../common/errors/AppError');

const SALT_ROUNDS = 12;

/**
 * Register a new user.
 */
const register = async ({ name, email, password }, ipAddress) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw AppError.conflict('Email already registered');

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({
    id: uuidv4(),
    name,
    email,
    passwordHash,
    role: 'owner',
    status: 'active',
  });

  // Generate tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Persist refresh token
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  await RefreshToken.create({
    id: uuidv4(),
    userId: user.id,
    token: refreshToken,
    expiresAt,
  });

  // Audit
  await AuditLog.create({
    userId: user.id,
    action: 'user.registered',
    entityType: 'user',
    entityId: user.id,
    ipAddress,
  });

  return {
    user: sanitizeUser(user),
    accessToken,
    refreshToken,
  };
};

/**
 * Login with email + password.
 */
const login = async ({ email, password }, ipAddress) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw AppError.unauthorized('Invalid email or password');
  if (user.status !== 'active') throw AppError.forbidden('Account is suspended');

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw AppError.unauthorized('Invalid email or password');

  // Update last login
  user.lastLoginAt = new Date();
  await user.save();

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await RefreshToken.create({
    id: uuidv4(),
    userId: user.id,
    token: refreshToken,
    expiresAt,
  });

  await AuditLog.create({
    userId: user.id,
    action: 'user.logged_in',
    entityType: 'user',
    entityId: user.id,
    ipAddress,
  });

  return {
    user: sanitizeUser(user),
    accessToken,
    refreshToken,
  };
};

/**
 * Refresh token rotation.
 * - Verifies old token
 * - Revokes old token
 * - Issues new access + refresh token pair
 */
const refresh = async (oldRefreshToken) => {
  let decoded;
  try {
    decoded = verifyRefreshToken(oldRefreshToken);
  } catch {
    throw AppError.unauthorized('Invalid or expired refresh token');
  }

  const storedToken = await RefreshToken.findOne({
    where: { token: oldRefreshToken, revoked: false },
  });

  if (!storedToken) {
    // Possible token reuse attack — revoke all tokens for this user
    await RefreshToken.update({ revoked: true }, { where: { userId: decoded.sub } });
    throw AppError.unauthorized('Refresh token reuse detected. All sessions revoked.');
  }

  if (storedToken.expiresAt < new Date()) {
    storedToken.revoked = true;
    await storedToken.save();
    throw AppError.unauthorized('Refresh token expired');
  }

  const user = await User.findByPk(decoded.sub);
  if (!user || user.status !== 'active') {
    throw AppError.unauthorized('User not found or suspended');
  }

  // Generate new pair
  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  // Rotate: revoke old, store new
  storedToken.revoked = true;
  storedToken.replacedByToken = newRefreshToken;
  await storedToken.save();

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await RefreshToken.create({
    id: uuidv4(),
    userId: user.id,
    token: newRefreshToken,
    expiresAt,
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

/**
 * Logout — revoke the provided refresh token.
 */
const logout = async (refreshToken) => {
  const stored = await RefreshToken.findOne({ where: { token: refreshToken } });
  if (stored) {
    stored.revoked = true;
    await stored.save();
  }
};

/* ── helpers ────────────────────────────────────────── */

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  status: user.status,
  createdAt: user.createdAt,
});

module.exports = { register, login, refresh, logout };
