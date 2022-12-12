'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class targets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      targets.belongsTo(models.users, {
        foreignKey: 'user_id'
      })
    }
  }
  targets.init({
    user_id: DataTypes.INTEGER,
    nameTarget: DataTypes.STRING,
    nominalTarget: DataTypes.INTEGER,
    dateTarget: DataTypes.DATEONLY,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'targets',
  });
  return targets;
};