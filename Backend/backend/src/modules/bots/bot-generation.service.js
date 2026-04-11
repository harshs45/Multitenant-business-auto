const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../../models');
const {
  Bot, Business, Subscription, BotAudienceConfig, BotFeature, BotTheme, AuditLog, EmbedToken
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
 * Orchestrates the Bot generation flow inside a single database transaction.
 * Rolls back atomically if any failure occurs.
 */
const generateBotTx = async (userId, payload) => {
  logger.info(`Starting bot generation for user ${userId}`);

  return await sequelize.transaction(async (t) => {
    // ─── 1. Create Business
    const businessType = BUSINESS_TYPE_MAP[payload.businessType] || payload.businessType?.toLowerCase() || 'saas';
    const businessId = uuidv4();
    const business = await Business.create({
      id: businessId,
      userId,
      name: payload.businessName || 'My Business',
      description: payload.businessDescription || null,
      businessType,
      website: payload.websiteUrl || null,
    }, { transaction: t });

    // ─── 2. Default Subscription
    await Subscription.create({
      id: uuidv4(),
      businessId: business.id,
      planKey: 'free',
      status: 'active',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    }, { transaction: t });

    // ─── 3. Create Bot (Mark generating)
    const botId = uuidv4();
    const tone = TONE_MAP[payload.toneOfVoice] || payload.toneOfVoice?.toLowerCase() || 'professional';
    const responseLanguage = LANGUAGE_MAP[payload.responseLanguage] || payload.responseLanguage?.toLowerCase() || 'en';

    const bot = await Bot.create({
      id: botId,
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
      status: 'generating', // Initial status
      isPublished: false,
    }, { transaction: t });

    // ─── 4. Audience Config
    const audienceConfig = await BotAudienceConfig.create({
      id: uuidv4(),
      botId: bot.id,
      supportEmail: payload.supportEmail || null,
      operatingHours: payload.businessHours || null,
      typeSpecificConfig: payload.adaptiveFields || null,
    }, { transaction: t });

    // ─── 5. Features
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

    // ─── 6. Theme
    const themeKey = THEME_KEY_MAP[payload.themeId] || payload.themeId || 'midnight_pro';
    const widgetPosition = payload.widgetPosition || 'bottom-right';

    await BotTheme.create({
      id: uuidv4(),
      botId: bot.id,
      themeKey,
      customPrimaryColor: payload.accentColor || null,
      widgetPosition,
    }, { transaction: t });

    // ─── 7. Finalize & Publish
    bot.systemPrompt = buildSystemPrompt(bot, business, audienceConfig, features);
    bot.isPublished = true;
    bot.status = 'published';
    bot.publishedAt = new Date();
    await bot.save({ transaction: t });

    // ─── 8. Create Embed Token (Public Key)
    const publicKey = crypto.randomBytes(32).toString('hex');
    const token = await EmbedToken.create({
      id: uuidv4(),
      botId: bot.id,
      publicKey,
      isActive: true,
    }, { transaction: t });

    // ─── 9. Audit Log
    await AuditLog.create({
      userId,
      action: 'BOT_GENERATED',
      entityType: 'bot',
      entityId: bot.id,
      metadata: { ...payload, publicKey } // Log full settings payload map for audit
    }, { transaction: t });

    logger.info(`Bot generation succeeded: ${bot.id}`);

    return {
      botId: bot.id,
      botName: bot.botName,
      publicKey: token.publicKey,
      businessId: business.id,
      businessName: business.name,
      themeKey,
      widgetPosition,
      accentColor: payload.accentColor || null,
      isPublished: true,
      publishedAt: bot.publishedAt,
      status: bot.status
    };
  }).catch((error) => {
    logger.error(`Bot generation failed for user ${userId}`, error);
    // Even though transaction rolls back correctly, we rethrow for the API controller to catch.
    throw new AppError('Failed to generate bot configuration', 500);
  });
};

module.exports = { generateBotTx };
