// src/controllers/homeController.js
const Product = require('../models/product');
const Category = require('../models/category');

exports.getHomePage = async (req, res) => {
  try {
    // Lấy danh sách sản phẩm đang hoạt động
    const products = await Product.find({ is_deleted: false }).populate('category_id');
    
    // Lấy danh sách các danh mục đang hoạt động
    const categories = await Category.find({ is_deleted: false });
    
    // Render trang home và truyền dữ liệu sản phẩm, danh mục vào
    res.render('home', { products, categories });
  } catch (error) {
    console.error('Error fetching data for home page:', error);
    res.status(500).send('Internal Server Error');
  }
};
