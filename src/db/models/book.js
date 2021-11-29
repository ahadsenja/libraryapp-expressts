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
      book.hasMany(models.author);
      book.hasMany(models.publisher);
      book.hasMany(models.category);
      book.hasMany(models.genre);
    }
  };
  book.init({
    author_id: DataTypes.INTEGER,
    publisher_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    genre_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'book',
    underscored: true,
  });
  return book;
};