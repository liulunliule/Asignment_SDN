const mongoose = require('mongoose');
const Category = require("../models/category");
const Product = require("../models/product");

exports.createCategory = async (req, res) => {
  try {
    const isExisted = await Category.findOne({ name: req.body.name });
    if (isExisted) {
      return res.status(400).json({
        status: false,
        message: "Category name already exists!",
      });
    }

    const category = new Category(req.body);
    await category.save();
    res.status(201).json({
      status: true,
      message: "successfull",
      data: category,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: true,
      message: "successfull",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params._id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({
      status: true,
      message: "successfull",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params._id, req.body, { new: true });
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({
      status: true,
      message: "Update successfull",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// exports.deleteCategory = async (req, res) => {
//   try {
//     const category = await Category.findByIdAndDelete(req.params._id, { is_deleted: true }, { new: true });
//     if (!category) return res.status(404).json({ message: "Category not found" });
//     res.status(200).json({ status: true, message: "Delete successfullly" });
//   } catch (error) {
//     res.status(500).json({ status: false, message: error.message });
//   }
// };

exports.deleteCategory = async (req, res) => {
  try {
    // Kiểm tra xem category có tồn tại hay không
    const category = await Category.findById(req.params._id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    // Xóa tất cả sản phẩm có liên quan đến category này
    await Product.deleteMany({ category_id: category._id });

    // Xóa category
    await Category.findByIdAndDelete(req.params._id);

    res.status(200).json({
      status: true,
      message: "Category and all related products deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


