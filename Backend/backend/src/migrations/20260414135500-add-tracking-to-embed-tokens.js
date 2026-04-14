'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('embed_tokens', 'last_used_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('embed_tokens', 'revoked_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('embed_tokens', 'last_used_at');
    await queryInterface.removeColumn('embed_tokens', 'revoked_at');
  },
};
