'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      author.hasMany(models.book, {
        foreignKey: 'author_id',
        as: 'book'
      });
    }
  };
  author.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    born_date: DataTypes.DATEONLY,
    born_place: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'author',
    underscored: true,
  });
  return author;
};