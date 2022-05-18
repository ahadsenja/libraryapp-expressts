'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      book.belongsTo(models.genre, {
        foreignKey: 'genre_id',
        as: 'genre'
      });

      book.belongsTo(models.category, {
        foreignKey: 'category_id',
        as: 'category'
      });

      book.belongsTo(models.author, {
        foreignKey: 'author_id',
        as: 'author'
      });

      book.belongsTo(models.publisher, {
        foreignKey: 'publisher_id',
        as: 'publisher'
      });

      book.hasMany(models.borrow, {
        foreignKey: 'book_id',
        as: 'borrow'
      });
    }
  };
  book.init({
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    genre_id: DataTypes.INTEGER,
    author_id: DataTypes.INTEGER,
    publisher_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'book',
    underscored: true,
  });
  return book;
};