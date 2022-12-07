const Device = require("../models/device");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Create new Device in Database(SQL)
exports.postAddDevice = async (req, res, next) => {
  const location = req.body.location;
  const sensorType = req.body.sensortype;
  console.log(location);
  console.log(sensorType);

  const result = await Device.create({
    location: location,
    sensortype: sensorType,
  }).catch((err) => {
    console.log(err);
    return err;
  });

  res.status(200).json({
    success: true,
    data: {
      message: "Device has been Added",
      id: result.dataValues.id,
    },
  });
};

// Return all registered ids for devices(IOT device server to fake generate data with real ids)
exports.getDeviceIds = async (req, res, next) => {
  const devices = await Device.findAll().catch((err) => {
    console.log(err);
    return err;
  });

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
};
