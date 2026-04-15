const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { EmbedToken, Bot, BotTheme, BotFeature, Business } = require('../../models');
const AppError = require('../../common/errors/AppError');
const { generateEmbedSnippet } = require('../../common/utils/embedSnippet');
const { THEMES } = require('../../common/constants/themes');

/**
 * Generate a new embed token for a published bot.
 */
const createToken = async (botId, userId, data) => {
  const bot = await Bot.findByPk(botId, {
    include: [{ model: Business, as: 'business' }],
  });
  if (!bot) throw AppError.notFound('Bot not found');
  if (bot.business.userId !== userId) throw AppError.forbidden('Access denied');
  if (!bot.isPublished) throw AppError.badRequest('Bot must be published before generating embed tokens');

  const publicKey = crypto.randomBytes(32).toString('hex');

  const token = await EmbedToken.create({
    id: uuidv4(),
    botId: bot.id,
    publicKey,
    allowedDomains: data.allowedDomains || [],
    isActive: true,
  });

  return token;
};

/**
 * Get embed HTML snippet for a bot.
 */
const getSnippet = async (botId, userId) => {
  const bot = await Bot.findByPk(botId, {
    include: [
      { model: Business, as: 'business' },
      { model: EmbedToken, as: 'embedTokens', where: { isActive: true }, limit: 1 }
    ],
  });
  if (!bot) throw AppError.notFound('Bot not found');
  if (bot.business.userId !== userId) throw AppError.forbidden('Access denied');

  // If no token exists, create one (backfill for old bots)
  let token = bot.embedTokens?.[0];
  if (!token) {
    const publicKey = `bf_pub_${crypto.randomBytes(16).toString('hex')}`;
    token = await EmbedToken.create({
      id: uuidv4(),
      botId: bot.id,
      publicKey,
      isActive: true,
    });
  }

  const baseUrl = process.env.API_BASE_URL || `https://botforge-api-m6d4.onrender.com`;
  const snippet = generateEmbedSnippet(token.publicKey, baseUrl);

  return { publicKey: token.publicKey, snippet };
};

module.exports = { createToken, getSnippet };