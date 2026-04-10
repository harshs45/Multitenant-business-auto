'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bot_audience_configs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      bot_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: { model: 'bots', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      target_audience: { type: Sequelize.STRING(255), allowNull: true },
      age_range: { type: Sequelize.STRING(50), allowNull: true },
      operating_hours: { type: Sequelize.STRING(100), allowNull: true },
      support_email: { type: Sequelize.STRING(255), allowNull: true },
      timezone: { type: Sequelize.STRING(50), allowNull: true },
      type_specific_config: { type: Sequelize.JSON, allowNull: true },
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
    await queryInterface.dropTable('bot_audience_configs');
  },
};
