const express = require("express");
const router = express.Router();
const identifyController = require("../controllers/identifyController");

// Correct route for /identify
router.post("/", identifyController.identifyContact);

module.exports = router;
