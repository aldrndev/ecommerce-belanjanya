"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaymentOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PaymentOption.hasMany(models.Payment);
    }
  }
  PaymentOption.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
    },
    {
      sequelize,
      modelName: "PaymentOption",
    }
  );
  return PaymentOption;
};
