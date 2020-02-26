const Sequelize = require("sequelize");

const databaseURL =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres";

const sequelize = new Sequelize(databaseURL);

module.exports = sequelize;
