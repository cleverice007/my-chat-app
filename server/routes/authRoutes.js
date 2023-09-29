const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 

// 處理註冊路由
router.post('/register', authController.registerUser);

// 處理登錄路由
router.post('/login', authController.loginUser);

module.exports = router;
