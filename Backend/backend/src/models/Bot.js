// src/models/Bot.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bot = sequelize.define(
    'Bot',
    {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      businessId: { type: DataTypes.UUID, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      botName: { type: DataTypes.STRING, allowNull: true },
      businessDescription: { type: DataTypes.TEXT, allowNull: true },
      avatarStyle: { type: DataTypes.STRING, allowNull: true },
      avatarUrl: { type: DataTypes.STRING(500), allowNull: true },
      welcomeMessage: { type: DataTypes.TEXT, allowNull: true },
      tone: { type: DataTypes.STRING, allowNull: true },
      responseLanguage: { type: DataTypes.STRING, allowNull: true },
      fallbackEmail: { type: DataTypes.STRING, allowNull: true },
      systemPrompt: { type: DataTypes.TEXT('long'), allowNull: true },
      setupStep: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      setupComplete: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      status: {
        type: DataTypes.ENUM('draft', 'generating', 'published', 'failed'),
        allowNull: false,
        defaultValue: 'draft',
      },
      isPublished: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      publishedAt: { type: DataTypes.DATE, allowNull: true },
      apiKey: { type: DataTypes.STRING(64), allowNull: true, unique: true },
      widgetActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: 'bots',
      timestamps: true,
      underscored: true, // ✅ this alone handles all snake_case mapping — no field: needed
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