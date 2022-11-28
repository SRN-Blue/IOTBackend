const express = require("express");
const { io } = require("socket.io-client");

const deviceRoutes = require("./routes/device");

const app = express();

console.log("This is Test Server! \n \n \n");

app.use("/device", deviceRoutes);
app.get("/", (req, res) => res.send("Hello World!"));

const server = app.listen(8002);
const socket = io("http://127.0.0.1:8080");
socket.emit("message", { data1: "test1 Data", data2: "Test2 Data" });
socket.on("message", (msg) => {
  console.log(msg);
});
