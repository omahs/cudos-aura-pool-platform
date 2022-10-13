module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('statistics_nft_owners_payout_history', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            time_owned_from: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            time_owned_to: {
                type: Sequelize.INTEGER,
            },
            total_time_owned: {
                type: Sequelize.INTEGER,
            },
            percent_of_time_owned: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            owner: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            payout_address: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            reward: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            nft_payout_history_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'statistics_nft_payout_history',
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
        await queryInterface.dropTable('statistics_nft_owners_payout_history');
    },
};
