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
      charge.belongsTo(models.book_return);
    }
  };
  charge.init({
    book_return_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    cost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'charge',
    underscored: true,
  });
  return charge;
};