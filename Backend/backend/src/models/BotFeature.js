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
      field: 'bot_id',        // ✅ explicit mapping
    },
    featureKey: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'feature_key',   // ✅ explicit mapping
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    config: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  }, {
    tableName: 'bot_features',
    timestamps: true,         // ✅ removed underscored: true
    indexes: [
      { unique: true, fields: ['bot_id', 'feature_key'] },
    ],
  });
  BotFeature.associate = (models) => {
    BotFeature.belongsTo(models.Bot, { foreignKey: 'botId', as: 'bot' });
  };
  return BotFeature;
};