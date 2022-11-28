const express = require("express");

const deviceController = require("../controllers/device");

const router = express.Router();

// POST /device/add-device
// Adding new device to database
router.post("/add-device", deviceController.addDevice);

// POST /device/livedata
// start sending Devices data over the socket
router.get("/livedata", deviceController.turnOnDevice);

// POST /device/login
// to get the token
router.post("/login", deviceController.postLogin);

module.exports = router;
