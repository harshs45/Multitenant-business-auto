const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UsageLog = sequelize.define('UsageLog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    businessId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    botId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    eventType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: 'conversation_started, message_sent, lead_captured, handoff_requested',
    },
    eventDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  }, {
    tableName: 'usage_logs',
    underscored: true,
    indexes: [
      { fields: ['business_id', 'event_type', 'event_date'] },
    ],
  });

  UsageLog.associate = (models) => {
    UsageLog.belongsTo(models.Business, { foreignKey: 'businessId', as: 'business' });
  };

  return UsageLog;
};
