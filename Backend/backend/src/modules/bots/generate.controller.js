/**
 * POST /api/v1/bots/generate
 *
 * Single orchestration endpoint that receives the entire wizard payload
 * and performs: create business → create bot → identity → features → theme → publish.
 * Returns the created botId and embed details.
 */
const { v4: uuidv4 } = require('uuid');
const {
  Bot, Business, Subscription, BotAudienceConfig, BotFeature, BotTheme, AuditLog,
} = require('../../models');
const { buildSystemPrompt } = require('./prompt.service');
const { THEME_KEYS, WIDGET_POSITIONS } = require('../../common/constants/themes');
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

const generate = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const body = req.body;

    // ─── 1. Create Business ──────────────────────────────
    const businessType = BUSINESS_TYPE_MAP[body.businessType] || body.businessType?.toLowerCase() || 'saas';
    const businessId = uuidv4();
    const business = await Business.create({
      id: businessId,
      userId,
      name: body.businessName || 'My Business',
      description: body.businessDescription || null,
      businessType,
      website: body.websiteUrl || null,
    });

    // Auto-create free subscription
    await Subscription.create({
      id: uuidv4(),
      businessId: business.id,
      planKey: 'free',
      status: 'active',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });

    // ─── 2. Create Bot ───────────────────────────────────
    const botId = uuidv4();
    const tone = TONE_MAP[body.toneOfVoice] || body.toneOfVoice?.toLowerCase() || 'professional';
    const responseLanguage = LANGUAGE_MAP[body.responseLanguage] || body.responseLanguage?.toLowerCase() || 'en';

    const bot = await Bot.create({
      id: botId,
      businessId: business.id,
      name: body.botName || body.businessName || 'My Bot',
      businessDescription: body.businessDescription || null,
      botName: body.botName || `${body.businessName || 'Business'}Bot`,
      avatarStyle: body.avatarStyle?.toLowerCase() || 'default',
      welcomeMessage: body.welcomeMessage || 'Hi there! How can I help you today?',
      tone,
      responseLanguage,
      fallbackEmail: body.fallbackEmail || null,
      setupStep: 5,
      setupComplete: true,
    });

    // ─── 3. Audience Config ──────────────────────────────
    const audienceConfig = await BotAudienceConfig.create({
      id: uuidv4(),
      botId: bot.id,
      supportEmail: body.supportEmail || null,
      operatingHours: body.businessHours || null,
      typeSpecificConfig: body.adaptiveFields || null,
    });

    // ─── 4. Features ─────────────────────────────────────
    const featureEntries = body.features || {};
    const enabledKeys = Object.entries(featureEntries)
      .filter(([, enabled]) => enabled)
      .map(([key]) => key.replace(/-/g, '_'));  // frontend uses dashes, backend uses underscores

    const featureRecords = enabledKeys.map((key) => ({
      id: uuidv4(),
      botId: bot.id,
      featureKey: key,
      enabled: true,
    }));
    if (featureRecords.length > 0) await BotFeature.bulkCreate(featureRecords);

    // ─── 5. Theme ────────────────────────────────────────
    const themeKey = THEME_KEY_MAP[body.themeId] || body.themeId || 'midnight_pro';
    const widgetPosition = body.widgetPosition || 'bottom-right';

    const theme = await BotTheme.create({
      id: uuidv4(),
      botId: bot.id,
      themeKey,
      customPrimaryColor: body.accentColor || null,
      widgetPosition,
    });

    // ─── 6. Publish ──────────────────────────────────────
    const features = await BotFeature.findAll({ where: { botId: bot.id } });
    bot.systemPrompt = buildSystemPrompt(bot, business, audienceConfig, features);
    bot.isPublished = true;
    bot.publishedAt = new Date();
    await bot.save();

    // ─── 7. Audit ────────────────────────────────────────
    await AuditLog.create({
      userId,
      action: 'bot.generated',
      entityType: 'bot',
      entityId: bot.id,
    });

    // ─── Response ────────────────────────────────────────
    res.status(201).json({
      success: true,
      data: {
        botId: bot.id,
        botName: bot.botName,
        businessId: business.id,
        businessName: business.name,
        themeKey,
        widgetPosition,
        accentColor: body.accentColor || null,
        isPublished: true,
        publishedAt: bot.publishedAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { generate };
