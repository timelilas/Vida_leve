'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      senha: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING(11),
        allowNull: true,
      },
      aniversario: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      sexo: {
        type: Sequelize.ENUM("masculino", "feminino"),
        allowNull: true,
      }
    })
  },

  async down (queryInterface) {
   await queryInterface.dropTable("user")
  }
};
