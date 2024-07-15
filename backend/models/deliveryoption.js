"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DeliveryOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      DeliveryOption.belongsTo(models.DeliveryCategory);
    }
  }
  DeliveryOption.init(
    {
      name: DataTypes.STRING,
      cost: DataTypes.INTEGER,
      DeliveryCategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DeliveryOption",
    }
  );
  return DeliveryOption;
};
