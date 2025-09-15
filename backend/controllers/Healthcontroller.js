import { checkNLPHealth } from '../services/nlp_services.js';
import { checkAIMLHealth } from '../services/aiml_services.js';
import ChatSession from '../models/Chatservices.js';
import Message from '../models/Message.js';
import UserFeedback from '../models/UserFeedback.js';

export async function healthCheck(req, res, next) {
  try {
    const dbStatus = 'healthy'; // TODO: real DB check

    const nlpStatus = await checkNLPHealth();
    const aimlStatus = await checkAIMLHealth();

    const status = {
      server: 'healthy',
      database: dbStatus,
      nlp_service: nlpStatus,
      aiml_service: aimlStatus,
      timestamp: new Date().toISOString()
    };

    const allHealthy = Object.values(status).every(s => s === 'healthy');
    
    res.status(allHealthy ? 200 : 503).json({
      success: allHealthy,
      status
    });
  } catch (error) {
    next(error);
  }
}

export async function getStats(req, res, next) {
  try {
    const totalSessions = await ChatSession.countDocuments({ isActive: true });
    const totalMessages = await Message.countDocuments();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const sessionsToday = await ChatSession.countDocuments({ createdAt: { $gte: today } });
    const messagesToday = await Message.countDocuments({ timestamp: { $gte: today } });

    const positiveFeedback = await UserFeedback.countDocuments({ feedback: 'positive' });
    const negativeFeedback = await UserFeedback.countDocuments({ feedback: 'negative' });

    res.json({
      success: true,
      stats: {
        totalSessions,
        totalMessages,
        sessionsToday,
        messagesToday,
        positiveFeedback,
        negativeFeedback,
        feedbackRatio: positiveFeedback / (positiveFeedback + negativeFeedback) || 0
      }
    });
  } catch (error) {
    next(error);
  }
}
