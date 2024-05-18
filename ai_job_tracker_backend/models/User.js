const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  displayName: String,
  email: String,
  accessToken: String,
  refreshToken: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
