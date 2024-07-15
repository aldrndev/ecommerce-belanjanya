"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../utils/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile);
      User.hasOne(models.Seller);
      User.hasMany(models.Product);
      User.hasMany(models.Order);
      User.hasMany(models.Payment);
      User.hasMany(models.Checkout);
      User.hasMany(models.Cart);
      User.hasMany(models.Conversation);
      User.hasMany(models.Message);
      User.hasMany(models.Participant);
      User.hasMany(models.Wishlist);
      User.hasMany(models.Discussion);
      User.hasMany(models.DiscussionMessage);
      User.hasMany(models.Review);
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user, options) => {
          user.password = hashPassword(user.password);
        },
      },
    }
  );
  return User;
};
