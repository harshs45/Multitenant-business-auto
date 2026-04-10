const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BotAudienceConfig = sequelize.define('BotAudienceConfig', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    botId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    /* ── Step 2: Audience & Operations ──────────── */
    targetAudience: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: 'e.g. "Small business owners", "College students"',
    },
    ageRange: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    operatingHours: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'e.g. "9:00-17:00 EST" or "24/7"',
    },
    supportEmail: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    timezone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    /* ── Type-specific JSON for adaptive fields ── */
    typeSpecificConfig: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'Dynamic fields that depend on businessType',
    },
  }, {
    tableName: 'bot_audience_configs',
    underscored: true,
  });

  BotAudienceConfig.associate = (models) => {
    BotAudienceConfig.belongsTo(models.Bot, { foreignKey: 'botId', as: 'bot' });
  };

  return BotAudienceConfig;
};
