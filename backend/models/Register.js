const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // (in production, hash this with bcrypt!)
});

module.exports = mongoose.model("User", userSchema);