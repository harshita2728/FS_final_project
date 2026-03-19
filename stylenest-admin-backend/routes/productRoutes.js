const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const upload= require('../middleware/upload');

const toPublicImageUrl = (req, imagePath) => {
  if (!imagePath) return '';
  const normalized = imagePath.replace(/\\/g, '/');
  const withLeadingSlash = normalized.startsWith('/') ? normalized : `/${normalized}`;
  return `${req.protocol}://${req.get('host')}${withLeadingSlash}`;
};

// GET all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  const withImageUrls = products.map(p => {
    const obj = p.toObject();
    if (obj.image) {
      obj.image = toPublicImageUrl(req, obj.image);
    }
    return obj;
  });
  res.json(withImageUrls);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const obj = product.toObject();
  if (obj.image) {
    obj.image = toPublicImageUrl(req, obj.image);
  }
  res.json(obj);
});

// ADD product
// router.post('/', async (req, res) => {
//   const product = new Product(req.body);
//   const saved = await product.save();
//   res.json(saved);
// });

router.post('/', upload.single('image'), async (req, res) => {
  try {

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      // description: req.body.description,
      image: req.file ? `/uploads/${req.file.filename}` : ''
    });

    await product.save();

    res.json({ message: 'Product added successfully', product: {
      ...product.toObject(),
      image: toPublicImageUrl(req, product.image)
    }});

  } catch (error) {
    res.status(500).json({ message: 'Error adding product' });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

// UPDATE product
// router.put('/:id', async (req, res) => {
//   const updated = await Product.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.json(updated);
// });
router.put('/:id', upload.single('image'), async (req, res) => {

  const updateData = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    // description: req.body.description
  };

  if (req.file) {
    updateData.image = `/uploads/${req.file.filename}`;
  }

  await Product.findByIdAndUpdate(req.params.id, updateData);

  res.json({ message: 'Product updated' });

});
module.exports = router;
