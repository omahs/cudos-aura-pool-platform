module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('farms', {
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
            description: {
                type: Sequelize.STRING,
            },
            sub_account_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            location: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            address_for_receiving_rewards_from_pool: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            leftover_reward_payout_address: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            maintenance_fee_payout_address: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            maintenance_fee_in_btc: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            creator_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'users',
                        schema: 'public',
                    },
                    key: 'id',
                },
            },
            deleted_at: {
                type: Sequelize.DATE,
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
        await queryInterface.dropTable('farms');
    },
};
