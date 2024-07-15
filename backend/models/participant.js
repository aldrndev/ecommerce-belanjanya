"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Participant.belongsTo(models.Conversation);
      Participant.belongsTo(models.User);
    }
  }
  Participant.init(
    {
      ConversationId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      lastRead: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Participant",
    }
  );
  return Participant;
};
