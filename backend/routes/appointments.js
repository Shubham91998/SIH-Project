const express = require('express');
const router = express.Router();
const {
  bookAppointment,
  getVaccinationReport,
  getAllAppointments
} = require('../controllers/appointmentController');

// POST /api/book - Book a new appointment
router.post('/book', bookAppointment);

// GET /api/report - Get vaccination report
router.get('/report', getVaccinationReport);

// GET /api/appointments - Get all appointments (optional)
router.get('/appointments', getAllAppointments);

module.exports = router;