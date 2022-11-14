const { io } = require("socket.io-client"); // Socket test

let socket;

module.exports = {
  init: (httpServer) => {
    socket = io(httpServer);
    return socket;
  },
  getIo: () => {
    if (!socket) {
      throw new Error("Socket Not Initialized!");
    }
    return socket;
  },
};
