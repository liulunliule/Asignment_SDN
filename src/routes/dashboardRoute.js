const express = require('express');
const { getDashboardPage } = require('../controllers/dashboardController');  // Import controller mới
// const authMiddleware = require('../middlewares/authMiddleware'); 

const router = express.Router();

// router.get('/dashboard', authMiddleware, getDashboardPage);
router.get('/dashboard', getDashboardPage);

module.exports = router;
