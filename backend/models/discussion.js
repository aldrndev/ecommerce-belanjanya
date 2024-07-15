"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discussion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Discussion.belongsTo(models.Product);
      Discussion.belongsTo(models.User);
      Discussion.hasMany(models.DiscussionMessage);
    }
  }
  Discussion.init(
    {
      ProductId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Discussion",
    }
  );
  return Discussion;
};
