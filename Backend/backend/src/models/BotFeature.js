const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BotFeature = sequelize.define('BotFeature', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    botId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    featureKey: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    config: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'Feature-specific configuration overrides',
    },
  }, {
    tableName: 'bot_features',
    underscored: true,
    indexes: [
      { unique: true, fields: ['bot_id', 'feature_key'] },
    ],
  });

  BotFeature.associate = (models) => {
    BotFeature.belongsTo(models.Bot, { foreignKey: 'botId', as: 'bot' });
  };

  return BotFeature;
};
