const mongoose = require("mongoose");

const chatSessionSchema = new mongoose.Schema({
  sessionId: String,
  title: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ChatSession", chatSessionSchema);
