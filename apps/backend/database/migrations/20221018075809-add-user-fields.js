'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Alter user table - add columns name and cudosAddress
     */
    const result = await sequelize.transaction(async (t) => {
      await queryInterface.addColumn('users', 'name', {
        type: Sequelize.STRING,
        allowNull: true,
      })
      await queryInterface.addColumn('users', 'cudosAddress', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Remove columns
     */
    const result = await sequelize.transaction(async (t) => {
      await queryInterface.removeColumn('users', 'name')
      await queryInterface.removeColumn('users', 'cudosAddress')
    })
  }
};
