'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class charge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      charge.belongsTo(models.book_return, {
        foreignKey: 'book_return_id',
        as: 'book_return'
      });
    }
  };
  charge.init({
    date: DataTypes.DATE,
    cost: DataTypes.FLOAT,
    book_return_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'charge',
    underscored: true,
  });
  return charge;
};