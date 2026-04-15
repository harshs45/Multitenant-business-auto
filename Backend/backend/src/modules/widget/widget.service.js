const { EmbedToken, Bot, BotTheme, BotFeature } = require('../../models');
const AppError = require('../../common/errors/AppError');
const { THEMES } = require('../../common/constants/themes');

/**
 * Public widget configuration service.
 * Fetches bot configuration using a secure public embed token.
 */
const getWidgetConfigByPublicKey = async (publicKey) => {
  // 1. Find the embed token and include basic bot info
  const token = await EmbedToken.findOne({
    where: { publicKey, isActive: true },
    include: [{ 
      model: Bot, 
      as: 'bot',
      where: { widgetActive: true, isPublished: true }
    }],
  });

  if (!token || !token.bot) {
    throw AppError.notFound('Invalid or inactive widget key');
  }

  const { bot } = token;

  // 2. Fetch associations separately to avoid complex joins and potential conflicts
  const theme = await BotTheme.findOne({ where: { botId: bot.id } });
  const features = await BotFeature.findAll({ where: { botId: bot.id, enabled: true } });

  const themeConfig = theme
    ? {
        ...THEMES[theme.themeKey],
        customPrimaryColor: theme.customPrimaryColor,
        widgetPosition: theme.widgetPosition,
      }
    : {};

  // 3. Update last_used_at timestamp
  token.lastUsedAt = new Date();
  await token.save();

  return {
    botName: bot.botName,
    avatarStyle: bot.avatarStyle,
    avatarUrl: bot.avatarUrl,
    welcomeMessage: bot.welcomeMessage,
    tone: bot.tone,
    language: bot.responseLanguage,
    theme: themeConfig,
    features: features.map((f) => f.featureKey),
  };
};

module.exports = { getWidgetConfigByPublicKey };
