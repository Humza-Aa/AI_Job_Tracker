const express = require("express");
const { getEmails } = require("../controllers/emailController");
const router = express.Router();

router.get("/", getEmails);

module.exports = router;
