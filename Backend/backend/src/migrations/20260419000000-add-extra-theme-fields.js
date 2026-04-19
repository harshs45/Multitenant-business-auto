'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('bot_themes', 'border_radius', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 12,
    });
    await queryInterface.addColumn('bot_themes', 'font_style', {
      type: Sequelize.STRING(50),
      allowNull: true,
      defaultValue: 'Modern',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('bot_themes', 'border_radius');
    await queryInterface.removeColumn('bot_themes', 'font_style');
  },
};
