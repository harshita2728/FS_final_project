const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const requireUser = require('../middleware/requireUser');

const toPublicImageUrl = (req, imagePath) => {
  if (!imagePath) return '';
  const normalized = imagePath.replace(/\\/g, '/');
  const withLeadingSlash = normalized.startsWith('/') ? normalized : `/${normalized}`;
  return `${req.protocol}://${req.get('host')}${withLeadingSlash}`;
};

const normalizeWishlist = (wishlist, req) => {
  if (!wishlist) return { items: [] };
  const obj = typeof wishlist.toObject === 'function' ? wishlist.toObject() : wishlist;
  if (Array.isArray(obj.items)) {
    obj.items = obj.items.map((item) => {
      if (item?.image) {
        item.image = toPublicImageUrl(req, item.image);
      }
      return item;
    });
  }
  return obj;
};

router.post('/add', requireUser, async (req, res) => {
  const { productId } = req.body;

  let wishlist = await Wishlist.findOne({ userId: req.user._id });
  if (!wishlist) wishlist = new Wishlist({ userId: req.user._id, items: [] });

  if (!wishlist.items.includes(productId)) {
    wishlist.items.push(productId);
    await wishlist.save();
  }

  await wishlist.populate('items');
  res.json(normalizeWishlist(wishlist, req));
});

router.get('/', requireUser, async (req, res) => {
  const wishlist = await Wishlist.findOne({ userId: req.user._id }).populate('items');
  res.json(normalizeWishlist(wishlist, req));
});

router.delete('/remove/:id', requireUser, async (req, res) => {
  await Wishlist.updateOne(
    { userId: req.user._id },
    { $pull: { items: req.params.id } }
  );
  res.json({ message: 'Removed' });
});

module.exports = router;
