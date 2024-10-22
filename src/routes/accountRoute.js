const express = require('express');
const { getLoginPage, getRegisterPage, login, register } = require('../controllers/accountController');
const router = express.Router();

// Routes cho login và register
router.get('/login', getLoginPage);  // Trang login
router.get('/register', getRegisterPage);  // Trang đăng ký

// Routes cho đăng nhập và đăng ký API
router.post('/login', login);  // Xử lý đăng nhập
router.post('/register', register);  // Xử lý đăng ký


module.exports = router;
