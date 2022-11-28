const Device = require("../models/device");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.postAddDevice = (req, res, next) => {
  const location = req.body.location;
  const sensorType = req.body.sensortype;
  console.log(location);
  console.log(sensorType);
  Device.create({ location: location, sensortype: sensorType })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        success: true,
        data: {
          message: "Device has been Added",
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
