"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Promo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Promo.hasMany(models.Order);
    }
  }
  Promo.init(
    {
      name: DataTypes.STRING,
      discount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Promo",
    }
  );
  return Promo;
};
