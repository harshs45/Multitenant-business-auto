"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("usage_logs", {
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
      bot_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: "bots", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      event_type: { type: Sequelize.STRING(50), allowNull: false },
      event_date: { type: Sequelize.DATEONLY, allowNull: false },
      count: { type: Sequelize.INTEGER, defaultValue: 1 },
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

    await queryInterface.addIndex(
      "usage_logs",
      ["business_id", "event_type", "event_date"],
      {
        name: "usage_logs_business_event_date",
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("usage_logs");
  },
};
