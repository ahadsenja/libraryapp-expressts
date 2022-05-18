'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class operator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      operator.hasMany(models.borrow, {
        foreignKey: 'operator_id',
        as: 'borrow'
      });
    }
  };
  operator.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    handphone: DataTypes.STRING,
    address: DataTypes.STRING,
    google_id: DataTypes.STRING,
    facebook_id: DataTypes.STRING,
    github_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'operator',
    underscored: true,
  });
  return operator;
};