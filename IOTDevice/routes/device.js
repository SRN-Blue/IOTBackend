const express = require("express");

const deviceController = require("../controllers/device");

const router = express.Router();

// GET /device/add-device
// Adding new device to database
router.post("/add-device", deviceController.addDevice);

// GET /device/livedata
// start sending Devices data over the socket
router.post("/livedata", deviceController.turnOnDevice);
router.post("/testdatalogin", deviceController.testPost);

module.exports = router;
