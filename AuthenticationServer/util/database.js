const Sequelize = require("sequelize");

const sequelize = new Sequelize("iot-authauth", "root", "MK!1998", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
