'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactionIncomes', {
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
      priceIncome: {
        type: Sequelize.INTEGER
      },
      categoryIncome: {
        type: Sequelize.STRING
      },
      dateIncome: {
        type: Sequelize.DATEONLY
      },
      descriptionIncome: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('transactionIncomes');
  }
};