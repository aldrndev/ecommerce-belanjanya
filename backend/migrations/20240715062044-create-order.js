"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      CheckoutId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Checkouts",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      status: {
        type: Sequelize.STRING,
      },
      totalPrice: {
        type: Sequelize.INTEGER,
      },
      courier: {
        type: Sequelize.STRING,
      },
      shipmentFee: {
        type: Sequelize.INTEGER,
      },
      invoiceNo: {
        type: Sequelize.STRING,
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
      ShipmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Shipments",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      PromoId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Promos",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      confirmedAt: {
        type: Sequelize.DATE,
      },
      prossessedAt: {
        type: Sequelize.DATE,
      },
      deliveredAt: {
        type: Sequelize.DATE,
      },
      completedAt: {
        type: Sequelize.DATE,
      },
      canceledAt: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Orders");
  },
};
