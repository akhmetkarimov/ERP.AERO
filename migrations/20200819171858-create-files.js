'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Files', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            file_name: {
                type: Sequelize.STRING
            },
            file_path: {
                type: Sequelize.TEXT
            },
            MIME: {
                type: Sequelize.STRING
            },
            size: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Files');
    }
};