const bcrypt = require("bcryptjs");

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
exports.getSignup = (req, res, next) => {
  console.log(req.session);
  console.log(req.session.isLoggedIn);
};
