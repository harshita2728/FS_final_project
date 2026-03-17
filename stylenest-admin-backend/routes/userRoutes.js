const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const phoneRegex = /^[0-9()+\-\s]{7,20}$/;

// REGISTER
router.post('/register', async (req, res) => {
  const { fullName, email, password, phone } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Full name, email, and password are required' });
  }

  const phoneNormalized = typeof phone === 'string' ? phone.trim() : '';
  if (phoneNormalized && !phoneRegex.test(phoneNormalized)) {
    return res.status(400).json({ message: 'Invalid phone number format' });
  }

  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ message: 'User already exists' });

  const hash = await bcrypt.hash(password, 10);
  const user = new User({ fullName, email, phone: phoneNormalized || undefined, password: hash });
  await user.save();

  res.json({ message: 'Registered successfully' });
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.json({ token, user: { id: user._id, email: user.email, fullName: user.fullName, phone: user.phone } });
});

// // PROFILE
// router.get('/profile', requireUser, async (req, res) => {
//   res.json(req.user);
// });

module.exports = router;
