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
      Product.hasMany(models.Cart);
      Product.hasMany(models.Wishlist);
      Product.hasMany(models.Discussion);
      Product.hasMany(models.Review);
      Product.hasMany(models.ProductImage);
      Product.belongsTo(models.ChildrenSubCategory);
    }
  }
  Product.init(
    {
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      brand: DataTypes.STRING,
      condition: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      location: DataTypes.STRING,
      discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      SellerId: DataTypes.INTEGER,
      ChildrenSubCategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
