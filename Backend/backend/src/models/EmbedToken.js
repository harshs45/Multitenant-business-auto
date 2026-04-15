const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EmbedToken = sequelize.define('EmbedToken', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    botId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    publicKey: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    allowedDomains: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      comment: 'Array of allowed origins e.g. ["https://example.com"]',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    lastUsedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    revokedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'embed_tokens',
    underscored: true,
  });

  EmbedToken.associate = (models) => {
    EmbedToken.belongsTo(models.Bot, { foreignKey: 'botId', as: 'bot' });
  };

  return EmbedToken;
};
