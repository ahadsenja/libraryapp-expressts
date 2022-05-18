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
      book_return.belongsTo(models.borrow, {
        foreignKey: 'borrow_id',
        as: 'borrow'
      });
    }
  };
  book_return.init({
    date: DataTypes.DATEONLY,
    pay_amount: DataTypes.INTEGER,
    status: DataTypes.STRING,
    borrow_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'book_return',
    underscored: true,
  });
  return book_return;
};