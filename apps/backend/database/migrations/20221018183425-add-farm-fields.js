'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Alter farms table - add columns manifacturers, miners, energy_source and total_farm_hashrate
     */
    await queryInterface.addColumn('farms', 'manifacturer', {
      type: Sequelize.STRING,
      allowNull: true,
    })
    await queryInterface.addColumn('farms', 'miner_types', {
      type: Sequelize.STRING,
      allowNull: true,
    })

    await queryInterface.addColumn('farms', 'energy_source', {
      type: Sequelize.STRING,
      allowNull: true,
    })

    await queryInterface.addColumn('farms', 'total_farm_hashrate', {
      type: Sequelize.FLOAT,
      allowNull: true
    })

    await queryInterface.addColumn('farms', 'status', {
      type: Sequelize.ENUM([
        'queued',
        'approved',
        'rejected'
      ]),
      allowNull: true
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Remove columns
     */
    await queryInterface.removeColumn('farms', 'manifacturer')
    await queryInterface.removeColumn('farms', 'miner_types')
    await queryInterface.removeColumn('farms', 'energy_source')
    await queryInterface.removeColumn('farms', 'total_farm_hashrate')
    await queryInterface.removeColumn('farms', 'status')
  }
};
