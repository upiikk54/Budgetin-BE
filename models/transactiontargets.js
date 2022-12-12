'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactiontargets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transactiontargets.belongsTo(models.users, {
        foreignKey: 'user_id'
      }),
      transactiontargets.belongsTo(models.targets, {
        foreignKey: 'target_id'
      })
    }
  }
  transactiontargets.init({
    user_id: DataTypes.INTEGER,
    target_id: DataTypes.INTEGER,
    nominalTransactionTarget: DataTypes.INTEGER,
    dateTransactionTarget: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'transactiontargets',
  });
  return transactiontargets;
};