const express = require("express");
const { io } = require("socket.io-client"); // Socket test

const deviceRoutes = require("./routes/device");

const app = express();

console.log("This is IOT Device Server! \n \n \n");

app.use("/device", deviceRoutes);
app.get("/", (req, res) => res.send("Hello World!"));

 app.listen(8081);
const socket = require('./socket').init("http://127.0.0.1:8080")
socket.emit("message", { data1: "test2 Data2", data2: "Test3 Data3" });
socket.on("message", (msg) => {
  console.log(msg);
});

