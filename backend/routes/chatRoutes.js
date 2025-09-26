const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.get("/chat/history", chatController.getAllChatHistory);
router.get("/chat/messages/:sessionId", chatController.getMessages);
router.post("/chat/message", upload.single("image"), chatController.newMessage);
router.get("/images/:filename", chatController.getImage);
router.post("/chat/voice", upload.single("voice"), chatController.newVoice);
router.get("/voice/:filename", chatController.getVoice);

module.exports = router;
