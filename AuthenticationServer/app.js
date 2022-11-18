const express = require("express");
const { io } = require("socket.io-client");
const sequelize = require("./util/database");

const deviceRoutes = require("./routes/device");
const deviceModel = require("./models/device");

const app = express();

app.use(express.json());

console.log("This is Authentication Server! \n \n \n");

app.use("/device", deviceRoutes);
app.get("/", (req, res) => res.send("Hello World!"));

sequelize
  .sync()
  .then((result) => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
