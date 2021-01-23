const Sequelize = require("sequelize");
const db = require("../config/database");

const Office = db.define(
  "tower",
  {
    tower_id: { type: Sequelize.INTEGER },
    name: { type: Sequelize.STRING },
  },
  {
    timestamps: false,
  }
);

module.exports = Office;
