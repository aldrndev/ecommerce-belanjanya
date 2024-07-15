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
      DiscussionId: DataTypes.INTEGER,
      SenderId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      isReply: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "DiscussionMessage",
    }
  );
  return DiscussionMessage;
};
