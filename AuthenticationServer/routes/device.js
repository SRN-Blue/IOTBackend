const express = require("express");

const deviceController = require("../controllers/device");

const router = express.Router();

// GET /feed/posts
router.get("/livedata", deviceController.getPost);

module.exports = router;
