const io = require("../socket");
// const got = await import('got');

exports.turnOnDevice = async (req, res, next) => {
  const socket = io.getIo();
  const got = await import("got");

  let jwtToken = req.headers.authorization.split(" ")[1];
  jwtToken = "Bearer" + " " + jwtToken.toString();

  const authServerAddress = process.env.AUTH_SERVER_ADD;
  const { data } = await got.got
    // .get("http://127.0.0.1:8000/device/get-ids", {
    .get(`http://${authServerAddress}:8000/device/get-ids`, {
      responseType: "json",
      headers: {
        Authorization: jwtToken,
      },
    })
    .json();
  console.log(`Here ${data}`);
  const idslist = data.id;
  const minId = idslist[0];
  const maxId = idslist[idslist.length - 1];

  // res.status(200).send("Device is Turned On!");

  const TimeInterval = setInterval(() => {
    const randomId = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
    let date = new Date();
    let stringDate = date.toString();
    deviceId = idslist[randomId];
    sensorLiveData = Math.random() * 101; // Generating fake number as sensor output(0 - 100)
    socket.emit("message", {
      deviceId: deviceId,
      sensorLiveData: sensorLiveData,
      date: stringDate,
    });
  }, 2000);
  res.status(200).send("Device is Turned On!");
};

// Send POST request to Auth/Auth server to create a new device in SQL database
exports.addDevice = async (req, res, next) => {
  const got = await import("got");

  const location = req.body.location;
  const sensortype = req.body.sensortype;
  let jwtToken = req.headers.authorization.split(" ")[1];
  jwtToken = "Bearer" + " " + jwtToken.toString();

  const authServerAddress = process.env.AUTH_SERVER_ADD;
  const { data } = await got.got
    .post(`http://${authServerAddress}:8000/device/add`, {
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

// Send Post requet to Auth/Auth server to get the token
exports.postLogin = async (req, res, next) => {
  const got = await import("got");

  const email = req.body.email;
  const password = req.body.password;

  const authServerAddress = process.env.AUTH_SERVER_ADD;
  const { data } = await got.got
    .post(`http://${authServerAddress}:8000/user/login`, {
      json: {
        email: email,
        password: password,
      },
    })
    .json();
  console.log(data);
  res.send(data);
};
