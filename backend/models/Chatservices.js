import { Schema, model } from 'mongoose';

const chatSessionSchema = new Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    default: 'New Chat'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  metadata: {
    device: String,
    browser: String,
    ipAddress: String
  }
});

chatSessionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default model('ChatSession', chatSessionSchema);