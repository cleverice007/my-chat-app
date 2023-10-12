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
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { Op } = require('sequelize');
const cors = require('cors');
const mysql = require('mysql');
const sequelize = require('./config/database');
const { UserAuth,UserProfile, ChatRoom, Message,UserMatching } = require('./models');

require('dotenv').config();
const userProfileRoutes = require('./routes/userProfileRoutes');
const chatRoutes = require('./routes/chatRoutes');
const authRoutes = require('./routes/authRoutes');
const matchRoutes = require('./routes/matchRoutes');
const { create } = require('domain');


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());
app.use('/', userProfileRoutes);
app.use('/', chatRoutes);
app.use('/', authRoutes);
app.use('/', matchRoutes);

let users = {};

io.on('connection', (socket) => {
  socket.on('init', (username) => {
    socket.username = username;
    users[username] = socket;
  });

  socket.on('privateMessage', async (data) => {
    const { from, to, message,createdAt } = data;
    try {
      const [chatRoom] = await ChatRoom.findOrCreate({
        where: {
          [Op.or]: [
            { user1Id: from, user2Id: to },
            { user1Id: to, user2Id: from },
          ],
        },
      });

      const chatRoomId = chatRoom.get('chatRoomId');

      await Message.create({
        chatRoomId,
        from,
        to,
        content: message,
        createdAt: new Date(createdAt),
      });
      const targetSocket = users[to];
      if (targetSocket) {
        targetSocket.emit('privateMessage', {
          from,
          message,
          createdAt,
        });
      } else {
        console.log("Target user is not connected.");
      }
    } catch (err) {
      console.error("Error handling private message:", err);
    }
  });
});
// app.js
/*
Message.drop()
  .then(() => {
    console.log('Message table dropped');
    return ChatRoom.drop();
  })
  .then(() => {
    console.log('ChatRoom table dropped');
    return UserMatching.drop();
  })
  .then(() => {
    console.log('UserMatching table dropped');
    return UserProfile.drop();
  })
  .then(() => {
    console.log('UserProfile table dropped');
    return UserAuth.drop();
  })
  .then(() => {
    console.log('UserAuth table dropped');
  })
  .catch(err => {
    console.error('An error occurred:', err);
  });
  */


UserAuth.sync()
  .then(() => {
    console.log('UserAuth table created');
    return UserProfile.sync();
  })
  .then(() => {
    console.log('UserProfile table created');
    return UserMatching.sync();  
  })
  .then(() => {
    console.log('UserMatching table created');  
    return ChatRoom.sync();
  })
  .then(() => {
    console.log('ChatRoom table created');
    return Message.sync();
  })
  .then(() => {
    console.log('Message table created');
  })
  .catch(err => {
    console.error('An error occurred:', err);
  });







const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';
server.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});
