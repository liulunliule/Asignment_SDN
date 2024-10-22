const Product = require('../models/product');
const Category = require('../models/category');

exports.createProduct = async (req, res) => {
  try {
    // check existing category
    const category = await Category.findById(req.body.category_id);
    if (!category) {
      return res.status(400).json({
        status: false,
        message: 'Category not found!',
      });
    }

    const product = new Product({ ...req.body, category_id: category._id });
    await product.save();
    res.status(201).json({
      status: true,
      message: 'successfull',
      data: product,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: true,
      message: 'successfull',
      data: products,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params._id);
    const tmp= product.name
    product.name= product.description
    product.description= tmp
    if (!product) return res.status(404).json({ status: false, message: 'Product not found' });
    res.status(200).json({
      status: true,
      message: 'successfull',
      data: product,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params._id, req.body, { new: true });
    if (!product) return res.status(404).json({ status: false, message: 'Product not found' });
    res.status(200).json({
      status: true,
      message: 'successfull',
      data: product,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params._id, { is_deleted: true }, { new: true });
    if (!product) return res.status(404).json({ status: false, message: 'Product not found' });
    res.status(200).json({ status: true, message: 'successfull' });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
