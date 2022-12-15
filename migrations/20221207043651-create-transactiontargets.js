'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactiontargets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'users',
          key: 'id'
        }
      },
      target_id: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'targets',
          key: 'id'
        }
      },
      nominalTransactionTarget: {
        type: Sequelize.INTEGER
      },
      dateTransactionTarget: {
        type: Sequelize.DATEONLY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactiontargets');
  }
};