'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('statistics_nft_payout_history', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      token_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'nfts',
            schema: 'public',
          },
          key: 'id',
        },
      },
      payout_period_start: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      payout_period_end: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reward: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      tx_hash: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('statistics_nft_payout_history');
  },
};
