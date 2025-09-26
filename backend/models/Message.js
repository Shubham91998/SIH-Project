const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sessionId: String,
  text: String,
  sender: String,
  timestamp: String,
  imageUrl: String,
  voiceUrl: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);
