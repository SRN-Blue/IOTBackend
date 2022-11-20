const express = require("express");
const { io } = require("socket.io-client");
const sequelize = require("./util/database");
const session = require("express-session");

const deviceRoutes = require("./routes/device");
const userRoutes = require("./routes/user");
const Area = require("./models/area");
const Device = require("./models/device");
const User = require("./models/user");
const Gateway = require("./models/iotGateway");

const app = express();

app.use(
  session({
    secret: "my secret is short",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());

console.log("This is Authentication Server! \n \n \n");

app.use("/device", deviceRoutes);
app.use("/user", userRoutes);
app.get("/", (req, res) => res.send("Hello World!"));

Gateway.hasMany(Device);
Gateway.belongsTo(Area, {
  as: "gatewayArea",
  constraints: true,
  onDelete: "CASCADE",
});

sequelize
  .sync({ force: true })
  .then((result) => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
