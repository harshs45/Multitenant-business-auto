'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bots', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      business_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'businesses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: { type: Sequelize.STRING(100), allowNull: true },
      business_description: { type: Sequelize.TEXT, allowNull: true },
      bot_name: { type: Sequelize.STRING(100), allowNull: true },
      avatar_style: { type: Sequelize.STRING(50), defaultValue: 'default' },
      avatar_url: { type: Sequelize.STRING(500), allowNull: true },
      welcome_message: { type: Sequelize.TEXT, allowNull: true },
      tone: { type: Sequelize.STRING(50), defaultValue: 'professional' },
      response_language: { type: Sequelize.STRING(10), defaultValue: 'en' },
      fallback_email: { type: Sequelize.STRING(255), allowNull: true },
      status: {
        type: Sequelize.ENUM('draft', 'generating', 'published', 'failed'),
        defaultValue: 'draft',
      },
      is_published: { type: Sequelize.BOOLEAN, defaultValue: false },
      published_at: { type: Sequelize.DATE, allowNull: true },
      setup_step: { type: Sequelize.INTEGER, defaultValue: 1 },
      setup_complete: { type: Sequelize.BOOLEAN, defaultValue: false },
      system_prompt: { type: Sequelize.TEXT('long'), allowNull: true },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('bots');
  },
};
