"use strict";
const foods = require("../../../data/foods.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("food", foods);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("food");
  },
};
