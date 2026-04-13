const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../../models');
const {
  Bot, Business, Subscription, BotAudienceConfig, BotFeature, BotTheme, AuditLog,
} = require('../../models');
const { buildSystemPrompt } = require('./prompt.service');
const logger = require('../../common/utils/logger');
const AppError = require('../../common/errors/AppError');

/* ─── Business-type mapping (frontend label → backend key) ── */
const BUSINESS_TYPE_MAP = {
  'E-commerce': 'ecommerce',
  'SaaS': 'saas',
  'Healthcare': 'healthcare',
  'Restaurant': 'restaurant',
  'Real Estate': 'real_estate',
  'Education': 'education',
  'Finance': 'finance',
  'Agency': 'creative_agency',
};

/* ─── Theme-key mapping (frontend → backend) ────────────── */
const THEME_KEY_MAP = {
  midnight: 'midnight_pro',
  emerald: 'emerald_fresh',
  sakura: 'sakura',
  ocean: 'ocean_breeze',
  slate: 'slate_classic',
  amber: 'warm_amber',
};

/* ─── Tone mapping (frontend label → backend key) ───────── */
const TONE_MAP = {
  'Professional': 'professional',
  'Friendly': 'friendly',
  'Casual': 'casual',
  'Formal': 'formal',
  'Witty': 'witty',
  'Empathetic': 'empathetic',
  'Enthusiastic': 'enthusiastic',
  'Calm': 'calm',
};

/* ─── Language mapping ──────────────────────────────────── */
const LANGUAGE_MAP = {
  'English': 'en',
  'Spanish': 'es',
  'French': 'fr',
  'German': 'de',
  'Portuguese': 'pt',
  'Hindi': 'hi',
  'Chinese': 'zh',
  'Japanese': 'ja',
  'Arabic': 'ar',
  'Italian': 'it',
};

/**
 * Generates a unique API key with 'bf_' prefix.
 */
const generateUniqueApiKey = async () => {
  let isUnique = false;
  let key;
  while (!isUnique) {
    key = `bf_${crypto.randomBytes(16).toString('hex')}`;
    const existing = await Bot.findOne({ where: { apiKey: key } });
    if (!existing) isUnique = true;
  }
  return key;
};

/**
 * Orchestrates the Bot generation flow inside a single database transaction.
 * Rolls back atomically if any failure occurs.
 */
const generateBotTx = async (userId, payload) => {
  logger.info(`Starting bot generation for user ${userId}`);

  return await sequelize.transaction(async (t) => {

    // ─── 1. Create Business ───────────────────────────────
    logger.info('Step 1/8: Creating business entry');
    const businessType = BUSINESS_TYPE_MAP[payload.businessType]
      || payload.businessType?.toLowerCase()
      || 'saas';

    const business = await Business.create({
      id: uuidv4(),
      userId,
      name: payload.businessName || 'My Business',
      description: payload.businessDescription || null,
      businessType,
      website: payload.websiteUrl || null,
    }, { transaction: t });

    // ─── 2. Default Subscription ──────────────────────────
    logger.info('Step 2/8: Initializing default subscription');
    await Subscription.create({
      id: uuidv4(),
      businessId: business.id,
      planKey: 'free',
      status: 'active',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    }, { transaction: t });

    // ─── 3. Create Bot ────────────────────────────────────
    logger.info('Step 3/8: Creating bot record and generating API key');
    const tone = TONE_MAP[payload.toneOfVoice]
      || payload.toneOfVoice?.toLowerCase()
      || 'professional';

    const responseLanguage = LANGUAGE_MAP[payload.responseLanguage]
      || payload.responseLanguage?.toLowerCase()
      || 'en';

    const apiKey = await generateUniqueApiKey();

    const bot = await Bot.create({
      id: uuidv4(),
      businessId: business.id,
      name: payload.botName || payload.businessName || 'My Bot',
      businessDescription: payload.businessDescription || null,
      botName: payload.botName || `${payload.businessName || 'Business'}Bot`,
      avatarStyle: payload.avatarStyle?.toLowerCase() || 'default',
      welcomeMessage: payload.welcomeMessage || 'Hi there! How can I help you today?',
      tone,
      responseLanguage,
      fallbackEmail: payload.fallbackEmail || null,
      setupStep: 5,
      setupComplete: true,
      status: 'generating',
      isPublished: false,
      apiKey,
      widgetActive: true,
    }, { transaction: t });

    // ─── 4. Audience Config ───────────────────────────────
    logger.info('Step 4/8: Configuring bot audience settings');
    const audienceConfig = await BotAudienceConfig.create({
      id: uuidv4(),
      botId: bot.id,
      supportEmail: payload.supportEmail || null,
      operatingHours: payload.businessHours || null,
      typeSpecificConfig: payload.adaptiveFields || null,
    }, { transaction: t });

    // ─── 5. Features ──────────────────────────────────────
    logger.info('Step 5/8: Enabling bot features');
    const featureEntries = payload.features || {};
    const enabledKeys = Object.entries(featureEntries)
      .filter(([, enabled]) => enabled)
      .map(([key]) => key.replace(/-/g, '_'));

    const featureRecords = enabledKeys.map((key) => ({
      id: uuidv4(),
      botId: bot.id,
      featureKey: key,
      enabled: true,
    }));

    let features = [];
    if (featureRecords.length > 0) {
      features = await BotFeature.bulkCreate(featureRecords, { transaction: t });
    }

    // ─── 6. Theme ─────────────────────────────────────────
    logger.info('Step 6/8: Applying UI theme configuration');
    const themeKey = THEME_KEY_MAP[payload.themeId] || payload.themeId || 'midnight_pro';
    const widgetPosition = payload.widgetPosition || 'bottom-right';

    await BotTheme.create({
      id: uuidv4(),
      botId: bot.id,
      themeKey,
      customPrimaryColor: payload.accentColor || null,
      widgetPosition,
    }, { transaction: t });

    // ─── 7. Build System Prompt & Publish ─────────────────
    logger.info('Step 7/8: Building system prompt and publishing bot');
    bot.systemPrompt = buildSystemPrompt(bot, business, audienceConfig, features);
    bot.isPublished = true;
    bot.status = 'published';
    bot.publishedAt = new Date();
    await bot.save({ transaction: t });

    // ─── 8. Audit Log ─────────────────────────────────────
    logger.info('Step 8/8: Creating audit log entry');
    await AuditLog.create({
      id: uuidv4(),
      userId,
      action: 'BOT_GENERATED',
      entityType: 'bot',
      entityId: bot.id,
      metadata: { ...payload, apiKey: bot.apiKey },
    }, { transaction: t });

    logger.info(`Bot generation succeeded: ${bot.id}`);

    const apiBase = process.env.API_BASE_URL || 'https://botforge-api-m6d4.onrender.com';
    const embedScript = `<script src="${apiBase}/widget/loader.js" data-botforge-key="${bot.apiKey}" data-botforge-api="${apiBase}/api/v1"></script>`;

    return {
      botId: bot.id,
      botName: bot.botName,
      apiKey: bot.apiKey,
      embedScript,
      businessId: business.id,
      businessName: business.name,
      themeKey,
      widgetPosition,
      accentColor: payload.accentColor || null,
      isPublished: true,
      publishedAt: bot.publishedAt,
      status: bot.status,
    };

  }).catch((error) => {
    // ─── Log the full real error ──────────────────────────
    logger.error(`Bot generation failed for user ${userId}`, {
      message: error.message,
      name: error.name,
      stack: error.stack,
      errors: error.errors,
      sql: error.sql,
      parent: error.parent?.message,
      original: error.original?.message,
    });

    // In development, surface the real error message
    if (process.env.NODE_ENV === 'development') {
      throw new AppError(`Bot generation failed: ${error.message}`, 500);
    }

    // In production, return generic message
    throw new AppError('Failed to generate bot configuration', 500);
  });
};

module.exports = { generateBotTx };