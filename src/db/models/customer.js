'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      customer.hasMany(models.book_return, {
        foreignKey: 'customer_id',
        as: 'book_return'
      });

      customer.hasMany(models.borrow, {
        foreignKey: 'customer_id',
        as: 'borrow'
      });
    }
  };
  customer.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    born_date: DataTypes.DATEONLY,
    born_place: DataTypes.STRING,
    handphone: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'customer',
    underscored: true,
  });
  return customer;
};