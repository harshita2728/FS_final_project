const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', requireUser, async (req, res) => {
  const order = new Order({
    userId: req.user._id,
    items: req.body.items,
    total: req.body.total
  });

  await order.save();
  res.json({ message: 'Order placed' });
});

router.get('/user', requireUser, async (req, res) => {
  const orders = await Order.find({ userId: req.user._id });
  res.json(orders);
});

module.exports = router;
