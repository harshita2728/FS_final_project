const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const upload= require('../middleware/upload');

// GET all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
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
      image: req.file ? req.file.path : ''
    });

    await product.save();

    res.json({ message: 'Product added successfully' });

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
    updateData.image = req.file.path;
  }

  await Product.findByIdAndUpdate(req.params.id, updateData);

  res.json({ message: 'Product updated' });

});
module.exports = router;
