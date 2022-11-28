const express = require("express");

const deviceController = require("../controllers/device");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// POST /device/add
// To create a new device in the database
router.post("/add", isAuth, deviceController.postAddDevice);

module.exports = router;
