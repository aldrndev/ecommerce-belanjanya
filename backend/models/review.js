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
      rating: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true, notNull: true, equals: [1, 2, 3, 4, 5] },
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          len: { args: [0, 300], msg: "Review Maksimal 300 karakter" },
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
