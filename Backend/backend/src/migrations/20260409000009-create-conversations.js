'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('conversations', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      bot_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'bots', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      session_id: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: true,
      },
      visitor_id: {
        type: Sequelize.STRING(128),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('active', 'closed', 'handed_off'),
        defaultValue: 'active',
      },
      message_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      closed_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
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
    await queryInterface.dropTable('conversations');
  },
};
