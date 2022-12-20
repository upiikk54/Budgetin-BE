'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactionIncome extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transactionIncome.belongsTo(models.users, {
        foreignKey: 'user_id'
      })
    }
  }
  transactionIncome.init({
    user_id: DataTypes.INTEGER,
    priceIncome: DataTypes.INTEGER,
    categoryIncome: DataTypes.STRING,
    dateIncome: DataTypes.DATEONLY,
    descriptionIncome: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'transactionIncome',
  });
  return transactionIncome;
};