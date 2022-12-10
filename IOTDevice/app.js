const express = require("express");

const deviceRoutes = require("./routes/device");

const app = express();

app.use(express.json());

console.log("This is IOT Device Server! \n \n \n");

app.use("/device", deviceRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT);
const sockerServerAddress = process.env.LIVEDATA_SERVER_ADD;
// console.log(sockerServerAddress);
// const socket = require("./socket").init("http://127.0.0.1:8080");
const socket = require("./socket").init(
  "http://" + sockerServerAddress + ":8080"
);
socket.emit("message", { data1: "test2 Data2", data2: "Test3 Data3" });
socket.on("message", (msg) => {
  console.log(msg);
});
