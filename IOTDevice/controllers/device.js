const io = require("../socket");

exports.turnOnDevice = (req, res, next) => {
  res.status(200).send("Device is Turned On!")
  const socket = io.getIo();
  const TimeInterval = setInterval((arg) => {
    let date = new Date();
    let stringDate = date.toString();
    deviceId = "1DB41234"; // static ID for now(would be dynamic later)
    sensorLiveData = Math.random() * 101; // Generating fake number as sensor output(0 - 100)
    socket.emit("message", {
      deviceId: deviceId,
      sensorLiveData: sensorLiveData,
      date: stringDate,
    });
  }, 2000);
};
