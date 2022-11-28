const io = require("../socket");
// const got = await import('got');

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
exports.addDevice = async (req, res, next) => {
  const got = await import("got");

  const location = req.body.location;
  const sensortype = req.body.sensortype;
  let jwtToken = req.headers.authorization.split(" ")[1];
  jwtToken = "Bearer" + " " + jwtToken.toString();

  const { data } = await got.got
    .post("http://127.0.0.1:8000/device/add", {
      json: {
        location: location,
        sensortype: sensortype,
      },
      responseType: "json",
      headers: {
        Authorization: jwtToken,
      },
    })
    .json();
  console.log(data);
  res.send(data);
};

exports.testPost = async (req, res, next) => {
  const got = await import("got");

  const email = req.body.email;
  const password = req.body.password;

  const { data } = await got.got
    .post("http://127.0.0.1:8000/user/login", {
      json: {
        email: email,
        password: password,
      },
    })
    .json();
  console.log(data);
  res.send(data);
};
