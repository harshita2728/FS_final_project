const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Order = require('../models/Order');

// GET all orders (admin view of user orders)
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'email')
      .populate('items.productId', 'name price image')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    
    // 1️⃣ Check admin exists
    const emailLower = email.trim().toLowerCase();
const admin = await Admin.findOne({ email: emailLower });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    // 2️⃣ Compare password correctly
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    // 3️⃣ Success
    res.status(200).json({
      message: 'Admin login successful',
      adminId: admin._id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
