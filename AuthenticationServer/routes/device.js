const express = require("express");

const deviceController = require("../controllers/device");

const router = express.Router();

// POST /device/add
router.post("/add", deviceController.postAddDevice);

module.exports = router;
