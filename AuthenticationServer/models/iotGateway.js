const Sequelize = require("sequelize");

if (process.env.NODE_ENV !== "test") {
  sequelize = require("../util/database");
} else {
  sequelize = require("../util/test-database");
}

const IotGateway = sequelize.define("gateway", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  model: Sequelize.STRING,
});

module.exports = IotGateway;
