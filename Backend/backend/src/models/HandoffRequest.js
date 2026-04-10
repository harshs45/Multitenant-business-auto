const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const HandoffRequest = sequelize.define('HandoffRequest', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    conversationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    botId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'resolved', 'expired'),
      defaultValue: 'pending',
    },
    assignedTo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: 'Email or user ID of the human agent',
    },
    resolvedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'handoff_requests',
    underscored: true,
  });

  HandoffRequest.associate = (models) => {
    HandoffRequest.belongsTo(models.Conversation, { foreignKey: 'conversationId', as: 'conversation' });
    HandoffRequest.belongsTo(models.Bot, { foreignKey: 'botId', as: 'bot' });
  };

  return HandoffRequest;
};
