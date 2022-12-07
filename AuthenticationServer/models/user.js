const Sequelize = require("sequelize");
let sequelize;

if (process.env.NODE_ENV !== "test") {
  sequelize = require("../util/database");
} else {
  sequelize = require("../util/test-database");
}

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
