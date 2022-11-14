const io = require("../socket");

exports.getPost = (req, res, next) => {
  let date = new Date();
  let stringDate = date.toString();
  deviceId = "1DB41234"; // static ID for now(would be dynamic later)
  sensorLiveData = Math.random() * 101; // Generating fake number as sensor output(0 - 100)
  io.getIo().emit('newData', {  action: 'create' });
  res.status(200).json({
    posts: [
      { deviceId: deviceId, sensorLiveData: sensorLiveData, date: stringDate },
    ],
  });
};
