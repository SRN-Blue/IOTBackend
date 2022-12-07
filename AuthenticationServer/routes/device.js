const express = require("express");

const deviceController = require("../controllers/device");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// POST /device/add
// To create a new device in the database
router.post("/add", isAuth, deviceController.postAddDevice);

// GET /device/get-ids
// To get all the ids of devices
router.get("/get-ids", isAuth, deviceController.getDeviceIds);

module.exports = router;
