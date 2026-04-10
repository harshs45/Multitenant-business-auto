/**
 * Jobs module — placeholder for background tasks.
 *
 * Future candidates:
 * - Cleanup expired refresh tokens
 * - Aggregate daily usage logs
 * - Send email digests for leads
 * - Schedule knowledge-base indexing
 */

const cleanupExpiredTokens = async () => {
  const { RefreshToken } = require('../models');
  const { Op } = require('sequelize');

  const deleted = await RefreshToken.destroy({
    where: {
      [Op.or]: [
        { expiresAt: { [Op.lt]: new Date() } },
        { revoked: true, updatedAt: { [Op.lt]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
      ],
    },
  });

  console.log(`🧹  Cleaned up ${deleted} expired/revoked refresh tokens`);
  return deleted;
};

module.exports = { cleanupExpiredTokens };
