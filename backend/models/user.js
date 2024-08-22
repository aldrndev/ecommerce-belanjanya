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
      User.hasOne(models.Shipment);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email sudah terdaftar",
          args: true,
        },
        validate: {
          isEmail: {
            msg: "Email tidak valid",
            args: true,
          },
          notEmpty: true,
          notNull: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          len: {
            args: [5],
            msg: "Password minimal 5 karakter",
          },
        },
      },
      isSeller: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
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
