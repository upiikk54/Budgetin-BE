'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactionOutcome extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transactionOutcome.belongsTo(models.users, {
        foreignKey: 'user_id'
      })
    }
  }
  transactionOutcome.init({
    priceOutcome: DataTypes.INTEGER,
    categoryOutcome: DataTypes.STRING,
    dateOutcome: DataTypes.DATE,
    descriptionOutcome: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'transactionOutcome',
  });
  return transactionOutcome;
};