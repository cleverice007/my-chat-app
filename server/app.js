const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { Op } = require('sequelize'); 


const cors = require('cors');
const mysql = require('mysql');
const sequelize = require('./config/database'); 
const { UserProfile, ChatRoom, Message } = require('./models');  // 引入所有模型

require('dotenv').config();
const userProfileRoutes = require('./routes/userProfileRoutes');
const chatRoutes = require('./routes/chatRoutes');

/*
// 資料庫連接設定
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

// 連接資料庫
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});
*/


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});
app.use(cors());

//使用到的路由
app.use('/', userProfileRoutes); 
app.use('/', chatRoutes); 


let users = {};
io.on('connection', (socket) => {
  socket.on('init', (username) => {
    socket.username = username;
    users[username] = socket;
  });

  socket.on('privateMessage', async (data) => {
    const { from, to, message } = data;  // 直接使用前端傳來的 data
    try {
      // 尋找或創建聊天室
      const [chatRoom] = await ChatRoom.findOrCreate({
        where: {
          [Op.or]: [
            { user1Id: from, user2Id: to },
            { user1Id: to, user2Id: from }
          ]
        }
      });
      
      const chatRoomId = chatRoom.get('chatRoomId');
      
      // 將訊息存入資料庫
      await Message.create({
        chatRoomId,
        userId: from,
        content: message
      });
      
      // 轉傳訊息至目標用戶
      const targetSocket = users[to];
      if (targetSocket) {
        targetSocket.emit('privateMessage', {
          from,
          message
        });
      } else {
        console.log("Target user is not connected.");
      }
    } catch (err) {
      console.error("Error handling private message:", err);
    }
  });
  

/*
UserProfile.sync({ force: true })
  .then(() => {
    console.log('UserProfile table created!');
    return ChatRoom.sync({ force: true });
  })
  .then(() => {
    console.log('ChatRoom table created!');
    return Message.sync({ force: true });
  })
  .then(() => {
    console.log('Message table created!');
  })
  .catch(err => {
    console.error('An error occurred:', err);
  });
*/
  UserProfile.sync()
  .then(() => {
    console.log('UserProfile table checked!');
    return ChatRoom.sync();
  })
  .then(() => {
    console.log('ChatRoom table checked!');
    return Message.sync();
  })
  .then(() => {
    console.log('Message table checked!');
    // 這裡開始你的應用邏輯，例如啟動 web 服務器
  })
  .catch(err => {
    console.error('An error occurred:', err);
  });
  
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';
server.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});