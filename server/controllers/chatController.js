const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/Message');
const { Op } = require('sequelize');

// 創建聊天室，並返回聊天室資訊，以及聊天室內的訊息
module.exports.getOrCreateChatAndFetchMessages = async (req, res) => {
  try {
    const { loggedInUserId, selectedUserId } = req.query;
    
    // 先檢查是否存在聊天室
    let chatRoom = await ChatRoom.findOne({
      where: {
        [Op.or]: [
          { user1Id: loggedInUserId, user2Id: selectedUserId },
          { user1Id: selectedUserId, user2Id: loggedInUserId }
        ]
      }
    });

    // 如果不存在，則創建一個
    if (!chatRoom) {
      chatRoom = await ChatRoom.create({
        user1Id: loggedInUserId,
        user2Id: selectedUserId,
      });
    }

    // 獲取該聊天室內的訊息
    const messages = await Message.findAll({
      where: {
        chatRoomId: chatRoom.chatRoomId,
      },
    });
    console.log("Fetched messages from database:", messages);

    // 返回結果
    res.status(200).json({
      chatRoom,
      messages
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

