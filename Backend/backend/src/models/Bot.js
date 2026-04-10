const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Bot = sequelize.define('Bot', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    businessId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    /* ── Step 1: Business Basics ────────────────────── */
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,   // filled during step 1
    },
    businessDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    /* ── Step 3: Bot Identity ───────────────────────── */
    botName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    avatarStyle: {
      type: DataTypes.STRING(50),
      defaultValue: 'default',
    },
    avatarUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    welcomeMessage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tone: {
      type: DataTypes.STRING(50),
      defaultValue: 'professional',
    },
    responseLanguage: {
      type: DataTypes.STRING(10),
      defaultValue: 'en',
    },
    fallbackEmail: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: { isEmail: true },
    },
    /* ── Publishing state ───────────────────────────── */
    status: {
      type: DataTypes.ENUM('draft', 'generating', 'published', 'failed'),
      defaultValue: 'draft',
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    /* ── Wizard progress ────────────────────────────── */
    setupStep: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: 'Current wizard step the user has reached (1-5)',
    },
    setupComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    /* ── Generated system prompt (cached) ───────────── */
    systemPrompt: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
  }, {
    tableName: 'bots',
    underscored: true,
  });

  Bot.associate = (models) => {
    Bot.belongsTo(models.Business, { foreignKey: 'businessId', as: 'business' });
    Bot.hasOne(models.BotAudienceConfig, { foreignKey: 'botId', as: 'audienceConfig' });
    Bot.hasMany(models.BotFeature, { foreignKey: 'botId', as: 'features' });
    Bot.hasOne(models.BotTheme, { foreignKey: 'botId', as: 'theme' });
    Bot.hasMany(models.EmbedToken, { foreignKey: 'botId', as: 'embedTokens' });
    Bot.hasMany(models.Conversation, { foreignKey: 'botId', as: 'conversations' });
  };

  return Bot;
};
