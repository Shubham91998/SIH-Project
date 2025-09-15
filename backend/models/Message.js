import { Schema, model } from 'mongoose';

import Message from '../models/Message.js';


const messageSchema = new Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  messageId: {
    type: String,
    required: true,
    unique: true
  },
  text: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    enum: ['user', 'bot'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  image: {
    url: String,
    filename: String,
    originalName: String,
    size: Number
  },
  nlpResponse: {
    intent: String,
    confidence: Number,
    entities: [{
      type: { type: String },
      value: String
    }]
  },
  aimlResponse: {
    predictions: [{
      class_name: String,
      confidence: Number,
      additional_info: Schema.Types.Mixed
    }],
    model_version: String
  },
  feedback: {
    type: String,
    enum: ['positive', 'negative', null],
    default: null
  }
});

messageSchema.index({ sessionId: 1, timestamp: 1 });

export default model('Message', messageSchema);