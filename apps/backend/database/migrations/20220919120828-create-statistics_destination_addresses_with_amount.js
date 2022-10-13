module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'statistics_destination_addresses_with_amount',
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                address: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                amount: {
                    type: Sequelize.DECIMAL,
                    allowNull: false,
                },
                tx_hash: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                farm_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: {
                            tableName: 'farms',
                            schema: 'public',
                        },
                        key: 'id',
                    },
                },
                time: {
                    allowNull: false,
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
            },
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable(
            'statistics_destination_addresses_with_amount',
        );
    },
};
