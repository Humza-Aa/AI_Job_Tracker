const express = require("express");
const {
  googleAuth,
  googleCallback,
  googleLogout,
  isAuthenticated,
} = require("../controllers/googleAuthController");
const router = express.Router();

router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
router.get("/isauthenticated", isAuthenticated)
router.get("/google/logout", googleLogout);

module.exports = router;
