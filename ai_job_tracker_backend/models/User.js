const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: { type: String, required: true },
  accessToken: String,
  refreshToken: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
