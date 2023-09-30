const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/userAuthController'); 

// 處理註冊路由
router.post('/register', userAuthController.registerUser);

// 處理登錄路由
router.post('/login', userAuthController.loginUser);

module.exports = router;
