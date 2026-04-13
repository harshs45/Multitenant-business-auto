'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('bots', 'api_key', {
      type: Sequelize.STRING(64),
      allowNull: true,
      unique: true,
    });

    await queryInterface.addColumn('bots', 'widget_active', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });

    // Add index for api_key
    await queryInterface.addIndex('bots', ['api_key'], {
      unique: true,
      name: 'bots_api_key_idx'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('bots', 'bots_api_key_idx');
    await queryInterface.removeColumn('bots', 'api_key');
    await queryInterface.removeColumn('bots', 'widget_active');
  }
};
