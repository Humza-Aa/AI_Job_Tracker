const express = require("express");
const { classifyEmail } = require("../controllers/classifierController.js");
const router = express.Router();

router.post("/", classifyEmail);

module.exports = router;
