'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book_return extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      book_return.belongsTo(models.book, {
        foreignKey: 'book_id',
        as: 'book'
      });

      book_return.belongsTo(models.operator, {
        foreignKey: 'operator_id',
        as: 'operator'
      });

      book_return.belongsTo(models.customer, {
        foreignKey: 'customer_id',
        as: 'customer'
      });
    }
  };
  book_return.init({
    customer_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    operator_id: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'book_return',
    underscored: true,
  });
  return book_return;
};