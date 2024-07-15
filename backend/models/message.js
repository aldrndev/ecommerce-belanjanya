"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.Conversation);
      Message.belongsTo(models.User);
    }
  }
  Message.init(
    {
      SenderId: DataTypes.INTEGER,
      ConversationId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      isRead: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
