const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  //Authorization: 'Bearer TOKEN'
  if (!token) {
    const error = new Error("Not Authenticated!");
    error.statusCode = 401;
    return res.status(401).json({
      success: false,
      data: { message: "Error!Token was not provided." },
    });
  }

  let decodedToken;
  try {
    //Decoding the token
    decodedToken = jwt.verify(token, "This is My secret key for JWT Token");
  } catch (error) {
    res.status(401).json({
      success: false,
      data: { error: error },
    });
  }

  if (!decodedToken.email) {
    return res
      .status(401)
      .json({ success: false, data: { error: "Invalid Token!" } });
  }

  next();
};
