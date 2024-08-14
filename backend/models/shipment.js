"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shipment.belongsTo(models.User);
      Shipment.hasMany(models.Order);
    }
  }
  Shipment.init(
    {
      receiver: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Shipment",
    }
  );
  return Shipment;
};
