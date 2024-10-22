const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// router.post('/product/create', createProduct);
router.get('/products', getProducts);
router.get('/product/:_id', getProductById);
// router.put('/product/:_id', updateProduct);
// router.delete('/product/:_id', deleteProduct);

router.post('/product/create',authMiddleware, createProduct);
// router.get('/products',authMiddleware, getProducts);
// router.get('/product/:_id',authMiddleware, getProductById);
router.put('/product/:_id',authMiddleware, updateProduct);
router.delete('/product/:_id',authMiddleware, deleteProduct);


module.exports = router;
