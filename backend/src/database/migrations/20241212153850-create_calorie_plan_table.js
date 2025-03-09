"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("caloriePlan", {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
        references: { model: "user", key: "id" },
      },
      type: {
        type: Sequelize.ENUM("gradual", "moderado", "acelerado"),
        primaryKey: true,
        allowNull: false,
      },
      durationInDays: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      dailyCalorieIntake: {
        type: Sequelize.SMALLINT,
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
  },

  async down(queryInterface) {
    await queryInterface.dropTable("caloriePlan");
  },
};
