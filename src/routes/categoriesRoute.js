const express = require('express');
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// router.post('/category/create', createCategory);
router.get('/categories', getCategories);
router.get('/category/:_id', getCategoryById);
// router.put('/category/:_id', updateCategory);
// router.delete('/category/:_id', deleteCategory);

router.post('/category/create', authMiddleware, createCategory);
// router.get('/categories', authMiddleware, getCategories);
// router.get('/category/:_id', authMiddleware, getCategoryById);
router.put('/category/:_id', authMiddleware, updateCategory);
router.delete('/category/:_id', authMiddleware, deleteCategory);

module.exports = router;
