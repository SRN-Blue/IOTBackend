const express = require("express");

const deviceController = require("../controllers/device");

const router = express.Router();

// GET /device/posts
router.post("/livedata", deviceController.turnOnDevice);
router.post("/testdatalogin", deviceController.testPost);

module.exports = router;
