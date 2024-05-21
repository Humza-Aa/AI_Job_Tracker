const express = require("express");
const {
  googleAuth,
  googleCallback,
  googleLogout,
} = require("../controllers/googleAuthController");
const router = express.Router();

router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
router.get("/google/logout", googleLogout);

module.exports = router;
