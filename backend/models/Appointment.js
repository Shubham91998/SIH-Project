const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  contact: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  vaccineType: {
    type: String,
    required: true,
    enum: ['Pfizer', 'Moderna', 'Covaxin']
  },
  location: {
    type: String,
    required: true,
    enum: ['Clinic A', 'Clinic B', 'Clinic C']
  },
  date: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);