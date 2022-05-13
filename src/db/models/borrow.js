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
      borrow.belongsTo(models.book, {
        foreignKey: 'book_id',
        as: 'book'
      });

      borrow.belongsTo(models.customer, {
        foreignKey: 'customer_id',
        as: 'customer'
      });

      borrow.belongsTo(models.operator, {
        foreignKey: 'operator_id',
        as: 'operator'
      });
    }
  };
  borrow.init({
    borrow_date: DataTypes.DATEONLY,
    return_date: DataTypes.DATEONLY,
    book_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    operator_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'borrow',
    underscored: true,
  });
  return borrow;
};