const Sequelize = require("sequelize");
const db = require("../config/database");
const Tower = require("./Tower");

const Office = db.define(
  "office",
  {
    tower_id: { type: Sequelize.INTEGER },
    name: { type: Sequelize.STRING }
  },
  {
    timestamps: false,
    underscored: true
  }
);

module.exports = Office;
