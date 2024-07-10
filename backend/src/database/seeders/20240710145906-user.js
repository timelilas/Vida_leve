'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        userName: 'root',
        email: 'root@root.com',
        password: 'root123!',
      },
      // {
      //   userName: 'jane_smith',
      //   email: 'jane.smith@example.com',
      //   password: 'hashed_password_here',
      // },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
