const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// create a new User
exports.postSignup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const users = await User.findAll({ where: { email: email } }).catch((err) => {
    console.log(err);
    return res.status(403).json({ success: false, message: err });
  });

  if (users.length > 0) {
    return res
      .status(200)
      .json({ success: true, message: "User already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  // returns a promise
  User.create({ name: name, email: email, password: hashedPassword });
  res.status(200).json({
    success: false,
    message: "User Has Been Created Successfully",
  });
};

// login with Session
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findAll({ where: { email: email } })
    .then((users) => {
      const user = users[0];
      if (users.length == 0) {
        return res.send("User Not Found!");
      }
      bcrypt
        .compare(password, user.password)
        .then((match) => {
          if (match) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log("the error is: " + err);
              res.send("Err in session save!");
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res.send("Something Went wrong, Try again!");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Validate the Token
exports.getAuthenticateDeviceToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  //Authorization: 'Bearer TOKEN'
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Error!Token was not provided." });
  }

  let decodedToken = "";
  try {
    //Decoding the token
    decodedToken = jwt.verify(token, "This is My secret key for JWT Token");
  } catch (error) {
    return res.status(401).json({ success: false, message: error });
  }

  // res.status(200).json({success:true, isdecoded: true, data:{email:decodedToken.email}});
  if (decodedToken.email) {
    res.status(200).json({ success: true, message: "None" });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "couldnt find the user!" });
  }
};

// Login with JWT(Generate new Token)
exports.postLoginToken = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findAll({ where: { email: email } })
    .then((users) => {
      const user = users[0];
      if (users.length == 0) {
        return res.send("User Not Found!");
      }
      bcrypt
        .compare(password, user.password)
        .then((match) => {
          let token;
          if (match) {
            token = jwt.sign(
              { email: email, password: password },
              "This is My secret key for JWT Token",
              { expiresIn: "1h" }
            );
            // sending token back
            res.status(200).json({
              success: true,
              data: { email: email, token: token },
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res.send("Something Went wrong, Try again!");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
