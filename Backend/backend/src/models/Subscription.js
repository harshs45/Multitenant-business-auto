const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Subscription = sequelize.define('Subscription', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    businessId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    planKey: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'free',
    },
    status: {
      type: DataTypes.ENUM('active', 'canceled', 'past_due', 'trialing'),
      defaultValue: 'active',
    },
    currentPeriodStart: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    currentPeriodEnd: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    externalSubscriptionId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: 'Stripe subscription ID or similar',
    },
    externalCustomerId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: 'Stripe customer ID or similar',
    },
  }, {
    tableName: 'subscriptions',
    underscored: true,
  });

  Subscription.associate = (models) => {
    Subscription.belongsTo(models.Business, { foreignKey: 'businessId', as: 'business' });
  };

  return Subscription;
};
