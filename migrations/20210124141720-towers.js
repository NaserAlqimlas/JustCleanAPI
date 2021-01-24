"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable("towers", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: Sequelize.DataTypes.STRING, allowNull: false },
      location: { type: Sequelize.DataTypes.STRING, allowNull: false },
      numberOfFloors: { type: Sequelize.DataTypes.SMALLINT, allowNull: false },
      rating: {
        type: (Sequelize.DataTypes.DECIMAL.types.postgres = ["numeric"]),
      },
      longitude: {
        type: (Sequelize.DataTypes.DECIMAL.types.postgres = ["numeric"]),
      },
      latitude: {
        type: (Sequelize.DataTypes.DECIMAL.types.postgres = ["numeric"]),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
