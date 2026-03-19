const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const requireUser = require('../middleware/requireUser');

const toPublicImageUrl = (req, imagePath) => {
  if (!imagePath) return '';
  const normalized = imagePath.replace(/\\/g, '/');
  const withLeadingSlash = normalized.startsWith('/') ? normalized : `/${normalized}`;
  return `${req.protocol}://${req.get('host')}${withLeadingSlash}`;
};

const normalizeCart = (cart, req) => {
  if (!cart) return { items: [] };
  const obj = typeof cart.toObject === 'function' ? cart.toObject() : cart;
  if (Array.isArray(obj.items)) {
    obj.items = obj.items.map((item) => {
      if (item?.productId?.image) {
        item.productId.image = toPublicImageUrl(req, item.productId.image);
      }
      return item;
    });
  }
  return obj;
};

router.post('/add', requireUser, async (req, res) => {
  const { productId, qty } = req.body;

  let cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) cart = new Cart({ userId: req.user._id, items: [] });

  const item = cart.items.find(i => i.productId == productId);
  if (item) item.qty += qty;
  else cart.items.push({ productId, qty });

  await cart.save();
  await cart.populate('items.productId');
  res.json(normalizeCart(cart, req));
});

router.get('/', requireUser, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
  res.json(normalizeCart(cart, req));
});

router.delete('/remove/:id', requireUser, async (req, res) => {
  await Cart.updateOne(
    { userId: req.user._id },
    { $pull: { items: { productId: req.params.id } } }
  );
  res.json({ message: 'Removed' });
});

router.put('/update/:id', requireUser, async (req, res) => {
  const { qty } = req.body;
  if (qty < 1) {
    // If quantity is less than 1, remove the item
    await Cart.updateOne(
      { userId: req.user._id },
      { $pull: { items: { productId: req.params.id } } }
    );
    return res.json({ message: 'Removed' });
  }
  
  await Cart.updateOne(
    { userId: req.user._id, 'items.productId': req.params.id },
    { $set: { 'items.$.qty': qty } }
  );
  
  const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
  res.json(normalizeCart(cart, req));
});

module.exports = router;
