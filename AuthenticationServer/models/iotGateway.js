const Sequelize = require("sequelize");
sequelize = require("../util/database");

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
