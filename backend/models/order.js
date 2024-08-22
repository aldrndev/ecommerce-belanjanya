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
      Order.hasMany(models.Payment);
    }
  }
  Order.init(
    {
      CheckoutId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
      courier: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
      shipmentFee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
      invoiceNo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
      SellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
      ShipmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
      PromoId: DataTypes.INTEGER,
      confirmedAt: DataTypes.DATE,
      prossessedAt: DataTypes.DATE,
      deliveredAt: DataTypes.DATE,
      completedAt: DataTypes.DATE,
      canceledAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
