"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("progress", {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
        references: { model: "user", key: "id" },
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("progress");
  },
};
