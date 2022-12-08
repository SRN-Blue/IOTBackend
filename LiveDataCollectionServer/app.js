const express = require("express");
const mongoose = require("mongoose");

const deviceRoutes = require("./routes/device");
const io = require("./util/io");

const app = express();

console.log("This is Live Data Collection Server! \n \n \n");

app.use("/device", deviceRoutes);
app.get("/", (req, res) => res.send("Hello World!"));

// const server = app.listen(8080);

let server = "";

mongoose
  .connect("mongodb://127.0.0.1:27017/IOT-LiveDataCollection")
  .then((result) => {
    console.log("Connected To MongoDB!");
    const server = app.listen(8080);
    io.TurnOnIo(server);
  })
  .catch((err) => {
    console.log(err);
  });
