import { Router } from 'express';
const router = Router();

import { sendMessage, getChatHistory, addFeedback } from '../controllers/ChatController.js';
import { single } from '../middlewere/upload.js';

// Send message (with optional image)
router.post('/message', single('image'), sendMessage);

// Get chat history for a session
router.get('/history/:sessionId', getChatHistory);

// Add feedback to a message
router.post('/feedback', addFeedback);

export default router;
