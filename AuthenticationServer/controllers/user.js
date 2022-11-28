const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  User.findAll({ where: { email: email } })
    .then((users) => {
      if (users.length > 0) {
        return res.send("User already exists!");
      }
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        // returns a promise
        User.create({ name: name, email: email, password: hashedPassword });
        res.send("User Has Been Created Successfully");
      });
    })
    .catch((err) => {
      console.log(err);
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
exports.getAuthenticateDeviceToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  //Authorization: 'Bearer TOKEN'
  if (!token) {
    res
      .status(200)
      .json({ success: false, message: "Error!Token was not provided." });
  }

  let decodedToke;
  try {
    //Decoding the token
    decodedToken = jwt.verify(token, "This is My secret key for JWT Token");
  } catch (error) {
    res.status(200).json({ success: false, error: error });
  }

  // res.status(200).json({success:true, isdecoded: true, data:{email:decodedToken.email}});
  if (decodedToken.email) {
    res.status(200).json({ success: true, error: "None" });
  }else{
    res.status(200).json({ success: false, error: "couldnt find the user!" });
  }
};

// Login with JWT
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
