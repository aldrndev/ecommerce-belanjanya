"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Product);
      Cart.belongsTo(models.User);
      Cart.hasMany(models.Checkout);
    }
  }
  Cart.init(
    {
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          min: {
            args: 1,
            msg: "Minimal quantity 1",
          },
        },
      },
      note: {
        type: DataTypes.TEXT,
        validate: {
          len: {
            args: [0, 100],
            msg: "Maximal 100 karakter",
          },
        },
      },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
