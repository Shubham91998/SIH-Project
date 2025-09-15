import { Schema, model } from 'mongoose';

const userFeedbackSchema = new Schema({
  messageId: {
    type: String,
    required: true,
    ref: 'Message'
  },
  sessionId: {
    type: String,
    required: true,
    ref: 'ChatSession'
  },
  userId: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    enum: ['positive', 'negative'],
    required: true
  },
  reason: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model('UserFeedback', userFeedbackSchema);