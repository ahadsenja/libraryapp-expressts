'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      borrow.hasMany(models.book);
      borrow.hasMany(models.customer);
      borrow.hasMany(models.operator);
    }
  };
  borrow.init({
    book_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    operator_id: DataTypes.INTEGER,
    borrow_date: DataTypes.DATE,
    return_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'borrow',
    underscored: true,
  });
  return borrow;
};