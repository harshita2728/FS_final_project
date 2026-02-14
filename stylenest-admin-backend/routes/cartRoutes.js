const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.post('/add', requireUser, async (req, res) => {
  const { productId, qty } = req.body;

  let cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) cart = new Cart({ userId: req.user._id, items: [] });

  const item = cart.items.find(i => i.productId == productId);
  if (item) item.qty += qty;
  else cart.items.push({ productId, qty });

  await cart.save();
  res.json(cart);
});

router.get('/', requireUser, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
  res.json(cart);
});

router.delete('/remove/:id', requireUser, async (req, res) => {
  await Cart.updateOne(
    { userId: req.user._id },
    { $pull: { items: { productId: req.params.id } } }
  );
  res.json({ message: 'Removed' });
});

module.exports = router;
