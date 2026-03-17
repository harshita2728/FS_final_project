const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

const phoneRegex = /^[0-9()+\-\s]{7,20}$/;

// USER: Submit contact message
router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, message, userId } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ message: 'Full name, email, and message are required' });
    }

    const phoneNormalized = typeof phone === 'string' ? phone.trim() : '';
    if (phoneNormalized && !phoneRegex.test(phoneNormalized)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }

    const contact = new Contact({
      userId,
      fullName,
      email,
      phone: phoneNormalized || undefined,
      message
    });

    await contact.save();
    res.json({ message: 'Message received' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

module.exports = router;
