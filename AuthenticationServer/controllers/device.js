const Device = require("../models/device");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.postAddDevice = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log("//////////////%%%%%%////////////");
  console.log(token);
  //Authorization: 'Bearer TOKEN'
  if (!token) {
    res
      .status(200)
      .json({ success: false, message: "Error!Token was not provided." });
  }

  let decodedToken;
  try {
    //Decoding the token
    decodedToken = jwt.verify(token, "This is My secret key for JWT Token");
    console.log("////////////////////////////////");
    console.log(decodedToken);
  } catch (error) {
    res.status(200).json({ success: false, error: error });
  }

  if (decodedToken.email) {
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
    res.status(200).json({ success: true, error: "None" });
  } else {
    res.status(200).json({ success: false, error: "couldnt find the user!" });
  }
};
