const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/Message');
const { Op } = require('sequelize');


module.exports.createOrFetchChatRoom = async (req, res) => {
  try {
    const { user1, user2 } = req.body;

    // 首先嘗試找到是否已經有一個現存的聊天室
    let chatRoom = await ChatRoom.findOne({
      where: {
        [Op.or]: [
          { user1Id: user1, user2Id: user2 },
          { user1Id: user2, user2Id: user1 }
        ]
      }
    });

    // 如果沒有找到，則創建一個新的聊天室
    if (!chatRoom) {
      chatRoom = await ChatRoom.create({
        user1Id: user1,
        user2Id: user2
      });
    }

    // 接著，找到該聊天室中的所有訊息
    const messages = await Message.findAll({
      where: {
        chatRoomId: chatRoom.chatRoomId
      },
      order: [['createdAt', 'ASC']]
    });

    // 將聊天室和訊息返回給前端
    res.status(200).json({
      chatRoom: chatRoom,
      messages: messages
    });

  } catch (error) {
    console.error("Error fetching or creating chat room:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getChatMessages = async (req, res) => {
  const { user1Id, user2Id } = req.query;

  try {
    // 尋找 chat room
    const chatRoom = await ChatRoom.findOne({
      where: {
        [Op.or]: [
          { user1Id: user1Id, user2Id: user2Id },
          { user1Id: user2Id, user2Id: user1Id }
        ]
      }
    });

    if (!chatRoom) {
      return res.status(404).json({ message: "Chat room not found" });
    }

    // 獲取該 chat room 的訊息
    const messages = await Message.findAll({
      where: { chatRoomId: chatRoom.chatRoomId },
      order: [['createdAt', 'ASC']]
    });

    res.json(messages);

  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
