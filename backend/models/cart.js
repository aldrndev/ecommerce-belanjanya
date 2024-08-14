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
      ProductId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      note: DataTypes.TEXT,
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
