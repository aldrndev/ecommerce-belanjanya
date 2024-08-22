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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          len: {
            args: [5, 100],
            msg: "Judul Produk Minimal 5 karakter dan Maksimal 100 karakter",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          min: {
            args: 1,
            msg: "Harga Minimal 1",
          },
        },
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          len: {
            args: [2, 20],
            msg: "Merk Minimal 2 karakter dan Maksimal 20 karakter",
          },
        },
      },
      condition: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          min: {
            args: 1,
            msg: "Stok Minimal 1",
          },
        },
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          min: {
            args: 1,
            msg: "Berat Minimal 1",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          len: {
            args: [10, 1000],
            msg: "Deskripsi Minimal 10 karakter dan Maksimal 1000 karakter",
          },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          len: {
            args: [2, 40],
            msg: "Lokasi Minimal 2 karakter dan Maksimal 40 karakter",
          },
        },
      },
      discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      SellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
      ChildrenSubCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
