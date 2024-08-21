"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SlugProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      SlugProduct.belongsTo(models.Seller);
      SlugProduct.belongsTo(models.Product);
    }
  }
  SlugProduct.init(
    {
      slugSeller: DataTypes.STRING,
      slugProduct: DataTypes.STRING,
      ProductId: DataTypes.INTEGER,
      SellerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SlugProduct",
    }
  );
  return SlugProduct;
};
