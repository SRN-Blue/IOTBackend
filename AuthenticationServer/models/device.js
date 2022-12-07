const Sequelize = require("sequelize");
sequelize = require("../util/database");

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
  },
});

module.exports = Device;
