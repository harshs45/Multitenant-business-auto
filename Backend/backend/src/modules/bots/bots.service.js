const { v4: uuidv4 } = require('uuid');
const { Bot, Business, BotAudienceConfig, BotFeature, BotTheme, Subscription, AuditLog, EmbedToken } = require('../../models');
const AppError = require('../../common/errors/AppError');
const { validateFeatures } = require('../../common/constants/features');
const { THEME_KEYS, WIDGET_POSITIONS } = require('../../common/constants/themes');
const { TONES, LANGUAGES, AVATAR_STYLES } = require('../../common/constants/tones');
const { PLANS } = require('../../common/constants/plans');
const { buildSystemPrompt } = require('./prompt.service');
const { paginate, paginatedResponse } = require('../../common/utils/pagination');

/* ─────────────────────── Helpers ──────────────────────── */

const loadFullBot = async (botId) => {
  return Bot.findByPk(botId, {
    include: [
      { model: Business, as: 'business' },
      { model: BotAudienceConfig, as: 'audienceConfig' },
      { model: BotFeature, as: 'features' },
      { model: BotTheme, as: 'theme' },
      { model: EmbedToken, as: 'embedTokens', where: { isActive: true }, required: false },
    ],
  });
};

const verifyOwnership = async (botId, userId) => {
  const bot = await Bot.findByPk(botId, {
    include: [{ model: Business, as: 'business' }],
  });
  if (!bot) throw AppError.notFound('Bot not found');
  if (bot.business.userId !== userId) throw AppError.forbidden('You do not own this bot');
  return bot;
};

const checkBotLimit = async (businessId) => {
  const sub = await Subscription.findOne({ where: { businessId } });
  if (!sub) return; // no subscription → no limit

  const plan = PLANS[sub.planKey];
  if (!plan || plan.maxBots === -1) return; // unlimited

  const botCount = await Bot.count({ where: { businessId } });
  if (botCount >= plan.maxBots) {
    throw AppError.forbidden(`Your '${plan.label}' plan allows a maximum of ${plan.maxBots} bot(s). Please upgrade.`);
  }
};

/* ─────────────────────── CRUD ─────────────────────────── */

const create = async (userId, data) => {
  const business = await Business.findOne({ where: { id: data.businessId, userId } });
  if (!business) throw AppError.notFound('Business not found');

  await checkBotLimit(business.id);

  const bot = await Bot.create({
    id: uuidv4(),
    businessId: business.id,
    name: data.name || null,
    businessDescription: data.businessDescription || null,
    setupStep: 1,
  });

  return bot;
};

const getById = async (botId, userId) => {
  const bot = await loadFullBot(botId);
  if (!bot) throw AppError.notFound('Bot not found');
  if (bot.business.userId !== userId) throw AppError.forbidden('Access denied');
  return bot;
};

const update = async (botId, userId, data) => {
  const bot = await verifyOwnership(botId, userId);

  const allowed = ['name', 'businessDescription'];
  allowed.forEach((key) => {
    if (data[key] !== undefined) bot[key] = data[key];
  });
  await bot.save();
  return bot;
};

const remove = async (botId, userId) => {
  const bot = await verifyOwnership(botId, userId);
  await bot.destroy();
};

/* ─────────────── Per-Step Config Updates ──────────────── */

const updateBusinessBasics = async (botId, userId, data) => {
  const bot = await verifyOwnership(botId, userId);
  if (data.name !== undefined) bot.name = data.name;
  if (data.businessDescription !== undefined) bot.businessDescription = data.businessDescription;
  if (bot.setupStep < 2) bot.setupStep = 2;
  await bot.save();
  return bot;
};

const updateAudienceConfig = async (botId, userId, data) => {
  const bot = await verifyOwnership(botId, userId);

  const [config] = await BotAudienceConfig.findOrCreate({
    where: { botId: bot.id },
    defaults: { id: uuidv4(), botId: bot.id },
  });

  if (data.targetAudience !== undefined) config.targetAudience = data.targetAudience;
  if (data.ageRange !== undefined) config.ageRange = data.ageRange;
  if (data.operatingHours !== undefined) config.operatingHours = data.operatingHours;
  if (data.supportEmail !== undefined) config.supportEmail = data.supportEmail;
  if (data.timezone !== undefined) config.timezone = data.timezone;
  if (data.typeSpecificConfig !== undefined) config.typeSpecificConfig = data.typeSpecificConfig;
  await config.save();

  if (bot.setupStep < 3) bot.setupStep = 3;
  await bot.save();

  return config;
};

const updateIdentity = async (botId, userId, data) => {
  const bot = await verifyOwnership(botId, userId);

  if (data.botName !== undefined) bot.botName = data.botName;
  if (data.avatarStyle !== undefined) {
    if (!AVATAR_STYLES.includes(data.avatarStyle)) throw AppError.badRequest(`Invalid avatar style. Must be one of: ${AVATAR_STYLES.join(', ')}`);
    bot.avatarStyle = data.avatarStyle;
  }
  if (data.avatarUrl !== undefined) bot.avatarUrl = data.avatarUrl;
  if (data.welcomeMessage !== undefined) bot.welcomeMessage = data.welcomeMessage;
  if (data.tone !== undefined) {
    if (!TONES.includes(data.tone)) throw AppError.badRequest(`Invalid tone. Must be one of: ${TONES.join(', ')}`);
    bot.tone = data.tone;
  }
  if (data.responseLanguage !== undefined) {
    if (!LANGUAGES.includes(data.responseLanguage)) throw AppError.badRequest(`Invalid language. Must be one of: ${LANGUAGES.join(', ')}`);
    bot.responseLanguage = data.responseLanguage;
  }
  if (data.fallbackEmail !== undefined) bot.fallbackEmail = data.fallbackEmail;

  if (bot.setupStep < 4) bot.setupStep = 4;
  await bot.save();

  return bot;
};

const updateFeatures = async (botId, userId, data) => {
  const bot = await verifyOwnership(botId, userId);
  const business = await Business.findByPk(bot.businessId);

  const featureKeys = data.features || [];
  const { isValid, invalidKeys } = validateFeatures(business.businessType, featureKeys);
  if (!isValid) {
    throw AppError.badRequest(`Invalid features for ${business.businessType}: ${invalidKeys.join(', ')}`);
  }

  // Replace all features (delete + bulk create)
  await BotFeature.destroy({ where: { botId: bot.id } });
  const records = featureKeys.map((key) => ({
    id: uuidv4(),
    botId: bot.id,
    featureKey: key,
    enabled: true,
  }));
  if (records.length > 0) await BotFeature.bulkCreate(records);

  if (bot.setupStep < 5) bot.setupStep = 5;
  await bot.save();

  return BotFeature.findAll({ where: { botId: bot.id } });
};

const updateTheme = async (botId, userId, data) => {
  const bot = await verifyOwnership(botId, userId);

  if (!THEME_KEYS.includes(data.themeKey) && data.themeKey !== 'custom') {
    throw AppError.badRequest(`Invalid theme. Must be one of: ${[...THEME_KEYS, 'custom'].join(', ')}`);
  }
  if (data.widgetPosition && !WIDGET_POSITIONS.includes(data.widgetPosition)) {
    throw AppError.badRequest(`Invalid widget position. Must be one of: ${WIDGET_POSITIONS.join(', ')}`);
  }

  const [theme] = await BotTheme.findOrCreate({
    where: { botId: bot.id },
    defaults: { id: uuidv4(), botId: bot.id, themeKey: data.themeKey },
  });

  theme.themeKey = data.themeKey;
  if (data.customPrimaryColor !== undefined) theme.customPrimaryColor = data.customPrimaryColor;
  if (data.widgetPosition !== undefined) theme.widgetPosition = data.widgetPosition;
  if (data.customCss !== undefined) theme.customCss = data.customCss;
  if (data.borderRadius !== undefined) theme.borderRadius = data.borderRadius;
  if (data.fontStyle !== undefined) theme.fontStyle = data.fontStyle;
  await theme.save();

  bot.setupComplete = true;
  await bot.save();

  return theme;
};

/* ─────────────────── Publish / Preview ────────────────── */

const publish = async (botId, userId) => {
  const bot = await loadFullBot(botId);
  if (!bot) throw AppError.notFound('Bot not found');
  if (bot.business.userId !== userId) throw AppError.forbidden('Access denied');

  // Validate minimum setup
  const errors = [];
  if (!bot.name) errors.push('Bot name is required (step 1)');
  if (!bot.botName) errors.push('Bot identity name is required (step 3)');
  if (!bot.features || bot.features.length === 0) errors.push('At least one feature must be enabled (step 4)');
  if (!bot.theme) errors.push('Theme must be selected (step 5)');
  if (errors.length > 0) throw AppError.badRequest('Cannot publish: incomplete setup', errors);

  // Regenerate system prompt
  bot.systemPrompt = buildSystemPrompt(bot, bot.business, bot.audienceConfig, bot.features);
  bot.isPublished = true;
  bot.publishedAt = new Date();
  await bot.save();

  // Audit
  await AuditLog.create({
    userId,
    action: 'bot.published',
    entityType: 'bot',
    entityId: bot.id,
  });

  return bot;
};

const preview = async (botId, userId) => {
  const bot = await loadFullBot(botId);
  if (!bot) throw AppError.notFound('Bot not found');
  if (bot.business.userId !== userId) throw AppError.forbidden('Access denied');

  // Generate prompt preview without persisting
  const prompt = buildSystemPrompt(bot, bot.business, bot.audienceConfig, bot.features || []);

  return {
    botId: bot.id,
    name: bot.name,
    botName: bot.botName,
    tone: bot.tone,
    language: bot.responseLanguage,
    theme: bot.theme,
    features: (bot.features || []).map((f) => f.featureKey),
    setupStep: bot.setupStep,
    setupComplete: bot.setupComplete,
    isPublished: bot.isPublished,
    generatedPrompt: prompt,
  };
};

module.exports = {
  create, getById, update, remove,
  updateBusinessBasics, updateAudienceConfig, updateIdentity, updateFeatures, updateTheme,
  publish, preview,
};
