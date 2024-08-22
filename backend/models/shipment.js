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
      receiver: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          len: {
            args: [3, 20],
            msg: "Penerima minimal 3 karakter dan maksimal 20 karakter",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          len: {
            args: [5, 20],
            msg: "Nomor HP minimal 5 karakter dan maksimal 20 karakter",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          len: {
            args: [5, 150],
            msg: "Alamat minimal 5 karakter dan maksimal 150 karakter",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
    },
    {
      sequelize,
      modelName: "Shipment",
    }
  );
  return Shipment;
};
