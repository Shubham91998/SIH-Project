import Message from '../models/Message.js';
import ChatSession from '../models/Chatservices.js';
import { processWithNLP } from '../services/nlp_services.js';
import { processWithAIML } from '../services/aiml_services.js';
import upload, { saveUploadedImage } from '../middlewere/upload.js';
// ⚠️ Ensure you create this model properly
// Example: models/UserFeedback.js
// import UserFeedback from '../models/UserFeedback.js';

/**
 * Send a user message (text or image), process it, and generate a bot response.
 */
export async function sendMessage(req, res, next) {
  try {
    const { message, sessionId } = req.body;
    const imageFile = req.file;
    const userId = req.userId || 'anonymous';

    // Validate input
    if (!message && !imageFile) {
      return res.status(400).json({
        success: false,
        error: 'No message or image provided'
      });
    }

    // Get or create chat session
    let session = await ChatSession.findOne({ sessionId });
    if (!session) {
      session = new ChatSession({
        sessionId,
        userId,
        title: message ? message.substring(0, 50) : 'Image Consultation',
        metadata: {
          device: req.headers['user-agent'],
          ipAddress: req.ip
        }
      });
      await session.save();
    }

    let imageData = null;

    // Process image if provided
    if (imageFile) {
      imageData = saveUploadedImage(imageFile);
    }

    // Save user message to DB
    const userMessage = new Message({
      sessionId,
      messageId: `msg_${Date.now()}`,
      text: message || (imageFile ? 'Image upload' : ''),
      sender: 'user',
      image: imageData
    });

    await userMessage.save();

    let nlpResponse = null;
    let aimlResponse = null;

    // Process text with NLP service
    if (message?.trim()) {
      try {
        nlpResponse = await processWithNLP(message, sessionId);
        userMessage.nlpResponse = nlpResponse;
        await userMessage.save();
      } catch (error) {
        console.error('NLP processing error:', error.message);
      }
    }

    // Process image with AIML service
    if (imageFile) {
      try {
        aimlResponse = await processWithAIML(imageFile.path);
        userMessage.aimlResponse = aimlResponse;
        await userMessage.save();
      } catch (error) {
        console.error('AIML processing error:', error.message);
      }
    }

    // Generate bot response
    const botResponse = generateBotResponse(nlpResponse, aimlResponse, message);

    // Save bot message to DB
    const botMessage = new Message({
      sessionId,
      messageId: `msg_${Date.now() + 1}`,
      text: botResponse,
      sender: 'bot',
      nlpResponse,
      aimlResponse
    });

    await botMessage.save();

    // Update session timestamp
    await ChatSession.updateOne(
      { sessionId },
      { updatedAt: new Date() }
    );

    res.json({
      success: true,
      message: botMessage,
      session
    });

  } catch (error) {
    next(error);
  }
}

/**
 * Get chat history for a given session.
 */
export async function getChatHistory(req, res, next) {
  try {
    const { sessionId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const messages = await Message.find({ sessionId })
      .sort({ timestamp: 1 })
      .limit(Number(limit))
      .skip((page - 1) * limit);

    const total = await Message.countDocuments({ sessionId });

    res.json({
      success: true,
      messages,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page)
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Add feedback for a given message.
 */
export async function addFeedback(req, res, next) {
  try {
    const { messageId, feedback, reason } = req.body;
    const userId = req.userId || 'anonymous';

    // Update message feedback
    const message = await Message.findOneAndUpdate(
      { messageId },
      { feedback },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }

    // ⚠️ Requires UserFeedback model
    const userFeedback = new UserFeedback({
      messageId,
      sessionId: message.sessionId,
      userId,
      feedback,
      reason
    });

    await userFeedback.save();

    res.json({
      success: true,
      message: 'Feedback recorded successfully'
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Helper function to generate bot response
 */
function generateBotResponse(nlpResponse, aimlResponse, userMessage) {
  if (nlpResponse && aimlResponse) {
    return `Based on your message "${userMessage}" and the image you provided, I recommend: ${nlpResponse.reply}. The image analysis suggests: ${JSON.stringify(aimlResponse?.predictions?.[0] || {})}`;
  } else if (nlpResponse) {
    return nlpResponse.reply;
  } else if (aimlResponse) {
    const pred = aimlResponse?.predictions?.[0];
    if (!pred) return "I received your image but couldn’t process it.";
    return `Based on the image analysis: ${pred.class_name} with ${(pred.confidence * 100).toFixed(2)}% confidence. ${pred.additional_info?.recommendation || ''}`;
  } else {
    return "I've received your message. Unfortunately, I'm having trouble processing it right now. Please try again or rephrase your question.";
  }
}
