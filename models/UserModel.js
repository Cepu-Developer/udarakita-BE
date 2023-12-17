// models/UserModel.js
const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
});

// Sinkronisasi model dengan database
db.sync()
  .then(() => {
    console.log("Model User terhubung dengan tabel di database");
  })
  .catch((err) => {
    console.error("Tidak dapat sinkronisasi model User dengan tabel di database:", err);
  });

module.exports = User;
