const { ChatRoom, Message } = require('../models'); // 請根據你的目錄結構進行調整

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
