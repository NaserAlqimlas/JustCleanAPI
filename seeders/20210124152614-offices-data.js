"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("offices", [
      {
        tower_id: 1,
        name: "JustClean"
      },
      {
        tower_id: 2,
        name: "Boubyan Bank"
      },
      {
        tower_id: 1,
        name: "Famous Office #1"
      },
      {
        tower_id: 1,
        name: "Famous Office #2"
      },
      {
        tower_id: 1,
        name: "Famous Office #3"
      },
      {
        tower_id: 1,
        name: "Famous Office #4"
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
