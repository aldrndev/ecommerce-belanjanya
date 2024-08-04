"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChildrenSubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChildrenSubCategory.belongsTo(models.SubCategory);
      ChildrenSubCategory.hasMany(models.Product);
    }
  }
  ChildrenSubCategory.init(
    {
      title: DataTypes.STRING,
      SubCategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ChildrenSubCategory",
    }
  );
  return ChildrenSubCategory;
};
