// src/routes/homeRoute.js
const express = require('express');
const { getHomePage } = require('../controllers/homeController');
const router = express.Router();

// Route trang chủ
router.get('/', getHomePage);

module.exports = router;
