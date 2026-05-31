"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("subscriptions", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      business_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "businesses", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      plan_key: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: "free",
      },
      status: {
        type: Sequelize.ENUM("active", "canceled", "past_due", "trialing"),
        defaultValue: "active",
      },
      current_period_start: { type: Sequelize.DATE, allowNull: true },
      current_period_end: { type: Sequelize.DATE, allowNull: true },
      external_subscription_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      external_customer_id: { type: Sequelize.STRING(255), allowNull: true },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("subscriptions");
  },
};
