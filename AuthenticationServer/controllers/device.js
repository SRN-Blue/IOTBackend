const Device = require("../models/device");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Create new Device in Database(SQL)
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
          id: result.dataValues.id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Return all registered ids for devices(IOT device server to fake generate data with real ids)
exports.getDeviceIds = (req, res, next) => {
  Device.findAll()
    .then((devices) => {
      console.log(devices);
      // extract the ids from devices object
      const arrayOfIds = devices.map((device) => {
        return device.dataValues.id;
      });
      res.status(200).json({
        success: true,
        data: {
          message: "Device has been fetched",
          id: arrayOfIds,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
