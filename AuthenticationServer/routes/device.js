const express = require("express");

const deviceController = require("../controllers/device");

const router = express.Router();

// POST /device/add
// To create a new device in the database
router.post("/add", deviceController.postAddDevice);

module.exports = router;
