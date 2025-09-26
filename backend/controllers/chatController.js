const ChatSession = require("../models/ChatSession");
const Message = require("../models/Message");
const axios = require("axios");
const path = require("path");

// Get chat history
exports.getAllChatHistory = async (req, res) => {
  try {
    // Find all chat sessions, sorted by updatedAt descending
    const sessions = await ChatSession.find().sort({ updatedAt: -1 });
    res.json({ sessions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get messages for a session
exports.getMessages = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const messages = await Message.find({ sessionId }).sort({ createdAt: 1 });
    res.json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handle new message (text + image)
exports.newMessage = async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    const image = req.file;

    // Save user message
    const userMessage = new Message({
      sessionId,
      text: message || null,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
      imageUrl: image ? `/uploads/${image.filename}` : null,
    });
    await userMessage.save();

    let responseText = "Thank you for your message.";

    if (message && message.trim() !== "") {
      try {
        const aiResponse = await axios.post("http://localhost:8000/nlp/predict", {
          question: message,
        });
        responseText = aiResponse.data.answer;
      } catch (err) {
        console.error("Error calling Python AI:", err.message);
        responseText = "AI service not available right now.";
      }
    }

    if (image) {
      responseText += " (Image received)";
    }

    // Save bot reply
    const botMessage = new Message({
      sessionId,
      text: responseText,
      sender: "bot",
      timestamp: new Date().toLocaleTimeString(),
    });
    await botMessage.save();

    res.json({
      text_response: { reply: responseText },
      image_analysis: image ? { received: true, filename: image.filename } : null,
    });
  } catch (error) {
    console.error("Error processing message:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get image file
exports.getImage = (req, res) => {
  const { filename } = req.params;
  res.sendFile(path.join(__dirname, "../uploads", filename));
};

// Handle voice upload
exports.newVoice = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const voiceFile = req.file;

    const voiceMessage = new Message({
      sessionId,
      text: "Voice message",
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
      voiceUrl: voiceFile ? `/uploads/${voiceFile.filename}` : null,
    });

    await voiceMessage.save();

    let chatSession = await ChatSession.findOne({ sessionId });
    if (!chatSession) {
      chatSession = new ChatSession({ sessionId, title: "Voice consultation" });
    }
    chatSession.updatedAt = new Date();
    await chatSession.save();

    res.json({
      text_response: { reply: "I've received your voice message. This is a mock response." },
      voice_processed: true,
    });
  } catch (error) {
    console.error("Error processing voice message:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get voice file
exports.getVoice = (req, res) => {
  const { filename } = req.params;
  res.sendFile(path.join(__dirname, "../uploads", filename));
};
