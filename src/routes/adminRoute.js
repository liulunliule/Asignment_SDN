const express = require('express');
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Dashboard
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const categories = await Category.find();
    const products = await Product.find();
    res.render('dashboard', { categories, products });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

// CRUD Category
router.post('/category/create', authMiddleware, createCategory);
router.put('/category/:_id', authMiddleware, updateCategory);
router.delete('/category/:_id', authMiddleware, deleteCategory);

// CRUD Product
router.post('/product/create', authMiddleware, createProduct);
router.put('/product/:_id', authMiddleware, updateProduct);
router.delete('/product/:_id', authMiddleware, deleteProduct);

module.exports = router;
