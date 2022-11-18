const Device = require("../models/device");

exports.postAddDevice = (req, res, next) => {
  const location = req.body.location;
  const sensorType = req.body.sensortype;
  console.log(location);
  console.log(sensorType);
  Device.create({ location: location, sensortype: sensorType })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
