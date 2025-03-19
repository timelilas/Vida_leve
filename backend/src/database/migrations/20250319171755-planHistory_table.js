'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable(
        "planHistory",
        {
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: "user",
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            references: { model: "user", key: "id" },
          },
          kcal: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          planType: {
            type: Sequelize.ENUM("gradual", "moderado", "acelerado"),
            allowNull: false,
          },
          date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
          },
        }
      )
      
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("planHistory");
  }
};
