const Sequelize = require("sequelize");

if (process.env.NODE_ENV !== "test") {
  sequelize = require("../util/database");
} else {
  sequelize = require("../util/test-database");
}

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
