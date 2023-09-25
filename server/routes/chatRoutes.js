const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get('api/getOrCreateChatAndFetchMessages ',chatController.getOrCreateChatAndFetchMessages);
// 導出這個路由對象，以便在其他檔案中使用
module.exports.router = router;
