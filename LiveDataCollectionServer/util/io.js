const sensorDataSaver = require("../controllers/ioController");

// will be run after database connection and server initialization
exports.TurnOnIo = (server) => {
  const io = require("../socket").init(server);

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    next();
  });

  io.on("connection", (socket) => {
    console.log("Client Connected!");
    io.emit("You are Connected!!!");
    socket.on("message", (msg) => {
      console.log(msg);
      sensorDataSaver.saveDataInDB(msg);
      io.emit("message", msg);
    });
  });
};
