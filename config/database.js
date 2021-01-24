const Sequelize = require("sequelize");

module.exports = new Sequelize("towers", "postgres", "rootpass", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idel: 10000
  }
});
