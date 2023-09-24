const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.post("/api/userprofiles",chatController.createOrFetchChatRoom);


// 導出這個路由對象，以便在其他檔案中使用
module.exports.router = router;
