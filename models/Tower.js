const Sequelize = require("sequelize");
const db = require("../config/database");

const Tower = db.define(
  "tower",
  {
    name: { type: Sequelize.STRING },
    location: { type: Sequelize.STRING },
    numberOfFloors: { type: Sequelize.SMALLINT },
    numberOfOffices: { type: Sequelize.INTEGER },
    rating: {
      type: (Sequelize.DataTypes.DECIMAL.types.postgres = ["numeric"]),
    },
    longitude: { type: Sequelize.DataTypes.GEOMETRY("POINT") },
    latitude: { type: Sequelize.DataTypes.GEOMETRY("POINT") },
  },
  {
    timestamps: false,
  }
);

module.exports = Tower;
