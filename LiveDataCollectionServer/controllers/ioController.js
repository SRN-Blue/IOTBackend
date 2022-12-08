const Sensor = require("../models/sensor");

// will be run when server gets a new message over socket
exports.saveDataInDB = (data) => {
  const deviceId = data.deviceId;
  const sensorLiveData = data.sensorLiveData;
  const date = data.date;
  if (!deviceId || !sensorLiveData || !date) {
    console.log(data)
    return console.log("Invalid Data!");
  } else {
    const sensor = new Sensor({
      deviceId: deviceId,
      sensorLiveData: sensorLiveData,
      date: date,
    });
    sensor
      .save()
      .then((result) => {
        console.log(result);
        return console.log("Sensor Data successfully addded to NoSql DataBase");
      })
      .catch((err) => {
        return console.log(err);
      });
  }
};
