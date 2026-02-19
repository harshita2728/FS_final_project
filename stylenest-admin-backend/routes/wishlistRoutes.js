const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const requireUser = require('../middleware/requireUser');

router.post('/add', requireUser, async (req, res) => {
  const { productId } = req.body;

  let wishlist = await Wishlist.findOne({ userId: req.user._id });
  if (!wishlist) wishlist = new Wishlist({ userId: req.user._id, items: [] });

  if (!wishlist.items.includes(productId)) {
    wishlist.items.push(productId);
    await wishlist.save();
  }

  res.json(wishlist);
});

router.get('/', requireUser, async (req, res) => {
  const wishlist = await Wishlist.findOne({ userId: req.user._id }).populate('items');
  res.json(wishlist);
});

router.delete('/remove/:id', requireUser, async (req, res) => {
  await Wishlist.updateOne(
    { userId: req.user._id },
    { $pull: { items: req.params.id } }
  );
  res.json({ message: 'Removed' });
});

module.exports = router;
