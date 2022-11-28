const express = require("express");

const deviceRoutes = require("./routes/device");

const app = express();

console.log("This is Live Data Collection Server! \n \n \n");

app.use("/device", deviceRoutes);
app.get("/", (req, res) => res.send("Hello World!"));

const server = app.listen(8080);
const io = require("./socket").init(server);

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  console.log(token);
  next();
});

io.on("connection", (socket) => {
  console.log("Client Connected!");
  io.emit("You are Connected!!!");
  socket.on("message", (msg) => {
    console.log(msg);
    // io.emit("message", msg);
  });
});
