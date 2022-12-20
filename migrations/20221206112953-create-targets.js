'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('targets', {
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
      nameTarget: {
        type: Sequelize.STRING
      },
      nominalTarget: {
        type: Sequelize.INTEGER
      },
      dateTarget: {
        type: Sequelize.DATEONLY
      },
      image: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('targets');
  }
};