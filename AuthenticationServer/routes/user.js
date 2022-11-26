const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

// POST /user/Signup
// to create a new user
router.post("/signup", userController.postSignup);

// POST /user/Login
// Login With JWT(Get the token)
router.post("/login", userController.postLoginToken);

// GET /user/Signup
// test route to check the JWT auth
router.get("/signup", userController.getSignup);

module.exports = router;
