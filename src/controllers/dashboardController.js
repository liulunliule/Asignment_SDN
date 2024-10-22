const Product = require('../models/product');  // Để lấy thông tin sản phẩm từ DB
const Category = require('../models/category');  // Để lấy thông tin danh mục từ DB

exports.getDashboardPage = async (req, res) => {
  try {
    // Lấy danh sách sản phẩm và danh mục đang hoạt động (is_deleted: false)
    const products = await Product.find({ is_deleted: false }).populate('category_id');
    const categories = await Category.find({ is_deleted: false });

    // Render trang dashboard với dữ liệu sản phẩm và danh mục
    res.render('dashboard', { 
      products, 
      categories, 
      username: req.userId  // Truyền thông tin người dùng đã đăng nhập
    });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
