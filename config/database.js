// config/database.js
const Sequelize = require("sequelize");

const db = new Sequelize("user_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
