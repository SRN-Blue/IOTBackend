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
      io.emit("message", msg);
    });
  });
};

module.exports
