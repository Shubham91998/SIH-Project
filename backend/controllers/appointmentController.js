const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Book a new appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { fullName, email, contact, vaccineType, location, date } = req.body;

    // Validate
    if (!fullName || !email || !contact || !vaccineType || !location || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const appointment = new Appointment({ fullName, email, contact, vaccineType, location, date });
    await appointment.save();

    // Send Email & SMS
    try { await sendEmail({ fullName, email, vaccineType, location, date }); } catch (err) { console.error("Email error:", err.message); }
    try { await sendSMS({ fullName, contact, vaccineType, location, date }); } catch (err) { console.error("SMS error:", err.message); }

    res.status(201).json({ message: 'Appointment booked successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



const sendEmail = async ({ fullName, email, vaccineType, location, date }) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or any SMTP service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // app password if Gmail 2FA is on
    },
  });

  const mailOptions = {
    from: `"Vaccine Center" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Appointment Confirmation',
    html: `<p>Hi ${fullName},</p>
           <p>Your appointment for <strong>${vaccineType}</strong> vaccine is confirmed.</p>
           <p>Location: ${location}<br/>Date: ${new Date(date).toLocaleDateString()}</p>
           <p>Thank you!</p>`,
  };

  await transporter.sendMail(mailOptions);
};

// SMS function
const sendSMS = async ({ fullName, contact, vaccineType, location, date }) => {
  await client.messages.create({
    body: `Hi ${fullName}, your appointment for ${vaccineType} vaccine is confirmed at ${location} on ${new Date(date).toLocaleDateString()}.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: contact, // must include country code, e.g., +91XXXXXXXXXX
  });
};


// Get vaccination report
exports.getVaccinationReport = async (req, res) => {
  try {
    // Get all appointments
    const appointments = await Appointment.find();
    
    // Calculate total appointments
    const total = appointments.length;
    
    // Calculate appointments by vaccine type
    const byType = [
      { type: 'Pfizer', count: appointments.filter(a => a.vaccineType === 'Pfizer').length },
      { type: 'Moderna', count: appointments.filter(a => a.vaccineType === 'Moderna').length },
      { type: 'Covaxin', count: appointments.filter(a => a.vaccineType === 'Covaxin').length }
    ];
    
    res.json({
      total,
      byType
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({
      message: 'Server error while fetching report.'
    });
  }
};

// Get all appointments (optional - for admin purposes)
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      message: 'Server error while fetching appointments.'
    });
  }
};