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

  const token = await EmbedToken.findOne({
    where: { botId: bot.id, isActive: true },
    order: [['createdAt', 'DESC']],
  });
  if (!token) throw AppError.notFound('No active embed token found. Generate one first.');

  const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 4000}`;
  const snippet = generateEmbedSnippet(token.publicKey, baseUrl);

  return { publicKey: token.publicKey, snippet };
};

/**
 * Public widget configuration endpoint.
 * Called by the embedded JS widget to get safe, frontend-only config.
 */
const getWidgetConfig = async (publicKey) => {
  const token = await EmbedToken.findOne({
    where: { publicKey, isActive: true },
    include: [{
      model: Bot,
      as: 'bot',
      include: [
        { model: BotTheme, as: 'theme' },
        { model: BotFeature, as: 'features' },
      ],
    }],
  });

  if (!token) throw AppError.notFound('Invalid or inactive widget key');
  if (!token.bot.isPublished) throw AppError.forbidden('Bot is not currently published');

  const bot = token.bot;
  const themeConfig = bot.theme
    ? {
        ...THEMES[bot.theme.themeKey],
        customPrimaryColor: bot.theme.customPrimaryColor,
        widgetPosition: bot.theme.widgetPosition,
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
    features: (bot.features || []).filter((f) => f.enabled).map((f) => f.featureKey),
    // DO NOT expose: systemPrompt, fallbackEmail, businessId, internalIds
  };
};

module.exports = { createToken, getSnippet, getWidgetConfig };
