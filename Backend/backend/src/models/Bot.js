// src/models/bot.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Bot = sequelize.define(
    'Bot',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      businessId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'business_id',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      botName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'bot_name',
      },
      businessDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'business_description',
      },
      avatarStyle: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'avatar_style',
      },
      welcomeMessage: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'welcome_message',
      },
      tone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      responseLanguage: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'response_language',
      },
      fallbackEmail: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'fallback_email',
      },
      systemPrompt: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
        field: 'system_prompt',
      },
      setupStep: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: 'setup_step',
      },
      setupComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'setup_complete',
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_published',
      },
      publishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'published_at',
      },

      // NEW: public widget key
      apiKey: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        field: 'api_key',
      },

      // Optional extra safety flag
      widgetActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'widget_active',
      },
    },
    {
      tableName: 'bots',
      underscored: true,
      timestamps: true,
    }
  );

  Bot.associate = (models) => {
    Bot.belongsTo(models.Business, { foreignKey: 'businessId' });
    Bot.hasOne(models.BotAudienceConfig, { foreignKey: 'botId' });
    Bot.hasMany(models.BotFeature, { foreignKey: 'botId' });
    Bot.hasOne(models.BotTheme, { foreignKey: 'botId' });
  };

  return Bot;
};