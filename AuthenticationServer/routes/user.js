const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

// POST /user/Signup
// to create a new user(Device)
router.post("/signup", userController.postSignup);

// POST /user/Login
// Login With JWT(to Get the token)
router.post("/login", userController.postLoginToken);

// GET /user/jwt-authentication
// to check the User(Device) JWT Token(return Json: true or false and error)
router.get("/jwt-authentication", userController.getAuthenticateDeviceToken);

module.exports = router;
