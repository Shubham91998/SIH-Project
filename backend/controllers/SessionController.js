import ChatSession from '../models/Chatservices.js';
import Message from '../models/Message.js';

export async function getUserSessions(req, res, next) {
  try {
    const userId = req.userId || 'anonymous';
    const { page = 1, limit = 20 } = req.query;

    // Fetch active sessions
    const sessions = await ChatSession.find({ userId, isActive: true })
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Add last message preview
    const sessionsWithPreview = await Promise.all(
      sessions.map(async (session) => {
        const lastMessage = await Message.findOne({ sessionId: session.sessionId })
          .sort({ timestamp: -1 })
          .select('text timestamp sender');

        return {
          ...session.toObject(),
          lastMessage: lastMessage
            ? {
                text: lastMessage.text,
                timestamp: lastMessage.timestamp,
                sender: lastMessage.sender,
              }
            : null,
        };
      })
    );

    const total = await ChatSession.countDocuments({ userId, isActive: true });

    res.json({
      success: true,
      sessions: sessionsWithPreview,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSession(req, res, next) {
  try {
    const { sessionId } = req.params;

    const session = await ChatSession.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found',
      });
    }

    res.json({
      success: true,
      session,
    });
  } catch (error) {
    next(error);
  }
}

export async function renameSession(req, res, next) {
  try {
    const { sessionId } = req.params;
    const { title } = req.body;

    const session = await ChatSession.findOneAndUpdate(
      { sessionId },
      { title },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found',
      });
    }

    res.json({
      success: true,
      session,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteSession(req, res, next) {
  try {
    const { sessionId } = req.params;

    const session = await ChatSession.findOneAndUpdate(
      { sessionId },
      { isActive: false },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found',
      });
    }

    res.json({
      success: true,
      message: 'Session deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}

export async function exportSession(req, res, next) {
  try {
    const { sessionId } = req.params;

    const session = await ChatSession.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found',
      });
    }

    const messages = await Message.find({ sessionId })
      .sort({ timestamp: 1 })
      .select('text sender timestamp -_id');

    const exportData = {
      session: {
        sessionId: session.sessionId,
        title: session.title,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
      },
      messages,
    };

    // Set headers for file download
    res.setHeader('Content-Type', 'application/json');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=chat-${sessionId}.json`
    );

    res.json(exportData);
  } catch (error) {
    next(error);
  }
}
