'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Collections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      denom: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hashing_power: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      farm_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Farms',
            schema: 'public',
          },
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Collections');
  },
};
