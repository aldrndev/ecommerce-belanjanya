"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DeliveryCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      DeliveryCategory.hasMany(models.DeliveryOption);
    }
  }
  DeliveryCategory.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DeliveryCategory",
    }
  );
  return DeliveryCategory;
};
