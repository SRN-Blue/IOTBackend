const Sequelize = require("sequelize");

if (process.env.NODE_ENV !== "test") {
  sequelize = require("../util/database");
} else {
  sequelize = require("../util/test-database");
}

const Device = sequelize.define("device", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sensortype: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Device;
