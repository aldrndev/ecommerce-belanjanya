"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Seller);
      Product.belongsTo(models.Category);
      Product.hasMany(models.Cart);
      Product.hasMany(models.Wishlist);
      Product.hasMany(models.Discussion);
      Product.hasMany(models.Review);
      Product.hasMany(models.ProductImage);
    }
  }
  Product.init(
    {
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      brand: DataTypes.STRING,
      CategoryId: DataTypes.INTEGER,
      condition: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      SellerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
