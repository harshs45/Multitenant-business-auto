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
    include: [{ model: Business, as: 'business' }],
  });
  if (!bot) throw AppError.notFound('Bot not found');
  if (bot.business.userId !== userId) throw AppError.forbidden('Access denied');

  const baseUrl = process.env.BASE_URL || `https://botforge-api-m6d4.onrender.com`;
  const snippet = generateEmbedSnippet(bot.apiKey, baseUrl);

  return { apiKey: bot.apiKey, snippet };
};

/**
 * Public widget configuration endpoint.
 * Called by the embedded JS widget to get safe, frontend-only config.
 */
const getWidgetConfig = async (key) => {
  const bot = await Bot.findOne({
    where: { apiKey: key, widgetActive: true },
    include: [
      { model: BotTheme },   // ← removed as: 'theme'
      { model: BotFeature }, // ← removed as: 'features'
    ],
  });

  if (!bot) throw AppError.notFound('Invalid or inactive widget key');
  if (!bot.isPublished) throw AppError.forbidden('Bot is not currently published');

  const themeConfig = bot.BotTheme  // ← was bot.theme
    ? {
        ...THEMES[bot.BotTheme.themeKey],
        customPrimaryColor: bot.BotTheme.customPrimaryColor,
        widgetPosition: bot.BotTheme.widgetPosition,
      }
    : {};

  return {
    botName: bot.botName,
    avatarStyle: bot.avatarStyle,
    avatarUrl: bot.avatarUrl,
    welcomeMessage: bot.welcomeMessage,
    tone: bot.tone,
    language: bot.responseLanguage,
    theme: themeConfig,
    features: (bot.BotFeatures || []).filter((f) => f.enabled).map((f) => f.featureKey), // ← was bot.features
  };
};

module.exports = { createToken, getSnippet, getWidgetConfig };