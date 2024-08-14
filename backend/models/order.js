"use strict";
const { Model, or } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Checkout);
      Order.belongsTo(models.User);
      Order.belongsTo(models.Promo);
      Order.belongsTo(models.Shipment);
      Order.belongsTo(models.Seller);
    }
  }
  Order.init(
    {
      CheckoutId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      totalPrice: DataTypes.INTEGER,
      courier: DataTypes.STRING,
      SellerId: DataTypes.INTEGER,
      ShipmentId: DataTypes.TEXT,
      PromoId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
