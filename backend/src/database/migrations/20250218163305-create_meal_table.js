"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "meal",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        type: {
          type: Sequelize.ENUM(
            "cafe-da-manha",
            "lanche",
            "almoco",
            "jantar",
            "outro"
          ),
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "user",
            key: "id",
          },
          references: { model: "user", key: "id" },
        },
        date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE(),
          defaultValue: Sequelize.fn("CURRENT_TIMESTAMP", 3),
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE(),
          defaultValue: Sequelize.fn("CURRENT_TIMESTAMP", 3),
          allowNull: false,
        },
      },
      {
        uniqueKeys: {
          unique_user_date_meal_type: { fields: ["userId", "date", "type"] },
        },
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("meal");
  },
};
