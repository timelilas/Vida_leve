"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("food", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      slug: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      measurementUnit: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      calories: {
        type: Sequelize.INTEGER(),
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
    });
    await queryInterface.addIndex("food", ["slug"], { using: "BTREE" });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("food");
  },
};
