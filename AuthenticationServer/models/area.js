const Sequelize = require("sequelize");
sequelize = require("../util/database");

const Area = sequelize.define("area", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  areaId: Sequelize.STRING,
});

module.exports = Area;
