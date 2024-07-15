"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Product);
      Review.belongsTo(models.User);
      Review.hasMany(models.ReviewImage);
    }
  }
  Review.init(
    {
      ProductId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      rating: DataTypes.STRING,
      message: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
