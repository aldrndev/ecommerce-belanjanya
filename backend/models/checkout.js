"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Checkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Checkout.hasMany(models.Order);
      Checkout.belongsTo(models.User);
      Checkout.belongsTo(models.Cart);
    }
  }
  Checkout.init(
    {
      CartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: "Checkout",
    }
  );
  return Checkout;
};
