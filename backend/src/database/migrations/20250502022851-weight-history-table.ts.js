'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      "weightHistory",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: "user", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        weight: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
      }
    )
  },

  async down (queryInterface) {
    await queryInterface.dropTable("weightHistory")
  },
};
