"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wishlist.belongsTo(models.Product);
      Wishlist.belongsTo(models.User);
    }
  }
  Wishlist.init(
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
    },
    {
      sequelize,
      modelName: "Wishlist",
    }
  );
  return Wishlist;
};
