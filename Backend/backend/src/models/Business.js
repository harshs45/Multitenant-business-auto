const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Business = sequelize.define('Business', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    businessType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'suspended', 'deleted'),
      defaultValue: 'active',
      allowNull: false,
    },
  }, {
    tableName: 'businesses',
    underscored: true,
  });

  Business.associate = (models) => {
    Business.belongsTo(models.User, { foreignKey: 'userId', as: 'owner' });
    Business.hasMany(models.Bot, { foreignKey: 'businessId', as: 'bots' });
    Business.hasOne(models.Subscription, { foreignKey: 'businessId', as: 'subscription' });
    Business.hasMany(models.UsageLog, { foreignKey: 'businessId', as: 'usageLogs' });
  };

  return Business;
};
