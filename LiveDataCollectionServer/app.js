const express = require("express");
const mongoose = require("mongoose");

const deviceRoutes = require("./routes/device");
const io = require("./util/io");

const app = express();

console.log("This is Live Data Collection Server! \n \n \n");

app.use("/device", deviceRoutes);

// const server = app.listen(8080);

let server = "";
const PORT = process.env.PORT || 8080;
mongoose
  // .connect("mongodb://127.0.0.1:27017/IOT-LiveDataCollection")
  // mongodb://root:password@mongo:27017/?authSource=admin
  // .connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`)
  .connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
  .then((result) => {
    console.log("Connected To MongoDB!");
    const server = app.listen(PORT);
    io.TurnOnIo(server);
  })
  .catch((err) => {
    console.log(err);
  });
