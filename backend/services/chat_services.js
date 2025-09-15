import { updateMany } from '../models/Chatservices.js';
import { aggregate } from '../models/Message.js';

export async function cleanupOldSessions(days = 30) {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const result = await updateMany(
      { 
        updatedAt: { $lt: cutoffDate },
        isActive: true 
      },
      { isActive: false }
    );
    
    return result.modifiedCount;
  } catch (error) {
    console.error('Error cleaning up old sessions:', error);
    throw error;
  }
}

export async function getPopularHealthTopics(limit = 10) {
  try {
    // This is a simplified example - you'd need more sophisticated NLP to extract topics
    const topics = await aggregate([
      { $match: { sender: 'user', text: { $ne: '' } } },
      { $group: { _id: '$nlpResponse.intent', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit }
    ]);
    
    return topics.map(topic => ({
      topic: topic._id || 'general',
      count: topic.count
    }));
  } catch (error) {
    console.error('Error getting popular topics:', error);
    return [];
  }
}