const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Lead = sequelize.define('Lead', {
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
    name: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    company: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING(50),
      defaultValue: 'chat',
      comment: 'chat, form, manual',
    },
  }, {
    tableName: 'leads',
    underscored: true,
  });

  Lead.associate = (models) => {
    Lead.belongsTo(models.Conversation, { foreignKey: 'conversationId', as: 'conversation' });
    Lead.belongsTo(models.Bot, { foreignKey: 'botId', as: 'bot' });
  };

  return Lead;
};
