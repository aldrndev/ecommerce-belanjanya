"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Seller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Seller.belongsTo(models.User);
      Seller.hasMany(models.Product);
    }
  }
  Seller.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      province: DataTypes.STRING,
      city: DataTypes.STRING,
      district: DataTypes.STRING,
      subDistrict: DataTypes.STRING,
      rt: DataTypes.STRING,
      rw: DataTypes.STRING,
      postalCode: DataTypes.STRING,
      image: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Seller",
    }
  );
  return Seller;
};
