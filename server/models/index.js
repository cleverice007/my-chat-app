const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const UserProfile = require('./UserProfile');
const ChatRoom = require('./ChatRoom');
const Message = require('./Message');

ChatRoom.hasMany(Message, { foreignKey: 'chatRoomId' });
Message.belongsTo(ChatRoom, { foreignKey: 'chatRoomId' });

Message.belongsTo(UserProfile, { foreignKey: 'userId' });
UserProfile.hasMany(Message, { foreignKey: 'userId' });

module.exports = {
    UserProfile,
    ChatRoom,
    Message,
    // ... add more models as they are defined
  };
//     }  