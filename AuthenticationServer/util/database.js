const Sequelize = require("sequelize");

let dbName;

if (process.env.NODE_ENV !== "test") {
  console.log("MainDB");
  dbName = "iot-authauth";
} else {
  console.log("TestDB");
  dbName = "iot-authauth-test-db";
}

const sequelize = new Sequelize(dbName, "root", "MK!1998", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
