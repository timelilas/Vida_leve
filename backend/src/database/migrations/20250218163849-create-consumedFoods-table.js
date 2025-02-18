'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('consumedFoods', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      mealId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'meal', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      foodId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'food', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
    });
    await queryInterface.addIndex('consumedFoods', ['mealId'], { using: 'BTREE' });
    await queryInterface.addIndex('consumedFoods', ['foodId'], { using: 'BTREE' });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('consumedFoods');
  }
};
