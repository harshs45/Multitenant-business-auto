"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bot_themes", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      bot_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: { model: "bots", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      theme_key: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      custom_primary_color: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      widget_position: {
        type: Sequelize.ENUM("bottom-right", "bottom-left", "center"),
        defaultValue: "bottom-right",
      },
      custom_css: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable("bot_themes");
  },
};
