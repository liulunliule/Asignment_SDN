const Product = require('../models/product'); 
const Category = require('../models/category'); 

exports.getDashboardPage = async (req, res) => {
  try {
    const products = await Product.find({ is_deleted: false }).populate('category_id');
    const categories = await Category.find({ is_deleted: false });

    // Render trang dashboard
    res.render('dashboard', { 
      products, 
      categories, 
      username: req.userId  // Truyền thông tin người dùng đã đăng nhập
    });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
