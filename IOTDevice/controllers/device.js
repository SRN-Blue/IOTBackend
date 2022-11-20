const io = require("../socket");

exports.turnOnDevice = (req, res, next) => {
  const socket = io.getIo();

  res.status(200).send("Device is Turned On!");

  const TimeInterval = setInterval(() => {
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

exports.testPost = async (req, res, next) => {
  const got = await import("got");
  const email = req.body.email;
  const password = req.body.password;

  const { data } = await got
    .post("http://127.0.0.1:8000/user/login", {
      json: {
        email: "james@gmail.com",
        password: "This is password",
      },
    })
    .json();
  console.log(data);
  res.send(data);
};
