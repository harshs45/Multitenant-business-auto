const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Conversation = sequelize.define('Conversation', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    botId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    sessionId: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      comment: 'Client-side session identifier',
    },
    visitorId: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: 'Anonymous visitor fingerprint / cookie ID',
    },
    status: {
      type: DataTypes.ENUM('active', 'closed', 'handed_off'),
      defaultValue: 'active',
    },
    messageCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'User agent, IP geo, referrer, etc.',
    },
    closedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'conversations',
    underscored: true,
  });

  Conversation.associate = (models) => {
    Conversation.belongsTo(models.Bot, { foreignKey: 'botId', as: 'bot' });
    Conversation.hasMany(models.Message, { foreignKey: 'conversationId', as: 'messages' });
    Conversation.hasOne(models.Lead, { foreignKey: 'conversationId', as: 'lead' });
    Conversation.hasOne(models.HandoffRequest, { foreignKey: 'conversationId', as: 'handoffRequest' });
  };

  return Conversation;
};
