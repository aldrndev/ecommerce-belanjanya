"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      brand: {
        type: Sequelize.STRING,
      },
      condition: {
        type: Sequelize.STRING,
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      weight: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.TEXT,
      },
      location: {
        type: Sequelize.STRING,
      },
      discount: {
        type: Sequelize.INTEGER,
      },
      SellerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Sellers",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      ChildrenSubCategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "ChildrenSubCategories",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
