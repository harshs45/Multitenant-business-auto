"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("embed_tokens", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      bot_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "bots", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      public_key: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true,
      },
      allowed_domains: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: "[]",
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
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
    await queryInterface.dropTable("embed_tokens");
  },
};
