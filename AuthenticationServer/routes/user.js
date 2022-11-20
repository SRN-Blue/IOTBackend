const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

// POST /user/Signup
router.post("/signup", userController.postSignup);
// POST /user/Login
router.post("/login", userController.postLogin);
// GET /user/Signup
router.get("/signup", userController.getSignup);

module.exports = router;
