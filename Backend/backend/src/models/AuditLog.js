module.exports = (sequelize, DataTypes) => {
  const AuditLog = sequelize.define(
    'AuditLog',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      action: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'e.g. bot.published, bot.config_updated, user.registered',
      },
      entityType: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: 'e.g. bot, business, user',
      },
      entityId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      changes: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'JSON diff of what changed',
      },
      metadata: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Additional context like features, tone, full payload mapping',
      },
      ipAddress: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
    },
    {
      tableName: 'audit_logs',
      underscored: true,
    }
  );

  AuditLog.associate = (models) => {
    if (models.User) {
      AuditLog.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  };

  return AuditLog;
};