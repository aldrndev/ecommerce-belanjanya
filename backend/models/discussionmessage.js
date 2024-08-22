"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DiscussionMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DiscussionMessage.belongsTo(models.Discussion);
      DiscussionMessage.belongsTo(models.User);
    }
  }
  DiscussionMessage.init(
    {
      DiscussionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          len: {
            args: [0, 300],
            msg: "Maksimal 300 karakter",
          },
        },
      },
      isReply: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
      isSeller: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: { notEmpty: true, notNull: true },
      },
    },
    {
      sequelize,
      modelName: "DiscussionMessage",
    }
  );
  return DiscussionMessage;
};
