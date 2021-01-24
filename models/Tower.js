const Sequelize = require("sequelize");
const db = require("../config/database");

const Tower = db.define(
  "tower",
  {
    name: { type: Sequelize.STRING },
    location: { type: Sequelize.STRING },
    numberOfFloors: { type: Sequelize.SMALLINT },
    rating: {
      type: (Sequelize.DataTypes.DECIMAL.types.postgres = ["numeric"])
    },
    longitude: {
      type: (Sequelize.DataTypes.DECIMAL.types.postgres = ["numeric"])
    },
    latitude: {
      type: (Sequelize.DataTypes.DECIMAL.types.postgres = ["numeric"])
    }
  },
  {
    timestamps: false
  }
);

module.exports = Tower;
