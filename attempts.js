const { Sequelize } = require("sequelize");
const sequelize = require("../database");

const Attempts = sequelize.define("attempts", {
  id: { type: Sequelize.SMALLINT, primaryKey: true },
  unsuccessful: Sequelize.SMALLINT,
});

module.exports = { Attempts };
