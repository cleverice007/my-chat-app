const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/userAuthController'); 

// 處理註冊路由
router.post('/api/register', userAuthController.registerUser);

// 處理登錄路由
router.post('/api/login', userAuthController.loginUser);

module.exports = router;
