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
    return queryInterface.bulkInsert("towers", [
      {
        name: "Hamra Tower",
        location: "Shuhada Area",
        numberOfFloors: 60,
        rating: 4.5,
        longitude: 29.3791,
        latitude: 47.9933,
      },
      {
        name: "Burj Mubarak",
        location: "Qibla",
        numberOfFloors: 18,
        rating: 1.5,
        longitude: 29.3793,
        latitude: 47.9935,
      },
      {
        name: "Nasers Favorite Tower",
        location: "Khalidiya",
        numberOfFloors: 2000,
        rating: 5,
        longitude: 29.3792,
        latitude: 47.9934,
      },
      {
        name: "Everyones least favorite tower",
        location: "bad place",
        numberOfFloors: 2,
        rating: 0,
        longitude: 29.379,
        latitude: 47.9932,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
