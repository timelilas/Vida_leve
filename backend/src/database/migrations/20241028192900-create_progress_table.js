"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("progress", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      height: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: false,
      },
      weight: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      goalWeight: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      activityFrequency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("progress");
  },
};
