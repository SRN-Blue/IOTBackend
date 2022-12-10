const Sequelize = require("sequelize");

let dbName;

// if (process.env.NODE_ENV !== "test") {
//   console.log("MainDB");
//   // dbName = "iot-authauth";
//   dbName = process.env.DB_NAME;
// } else {
//   console.log("TestDB");
//   dbName = "iot-authauth-test-db";
// }
// "MK!1998"
dbName = process.env.DB_NAME;
const DbHostName = process.env.DB_HOST.toString();
const sequelize = new Sequelize(
  dbName,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "mysql",
    host: DbHostName,
  }
);

module.exports = sequelize;
