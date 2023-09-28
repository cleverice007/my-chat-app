const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const UserProfile = require('./UserProfile');
const ChatRoom = require('./ChatRoom');
const Message = require('./Message');
const UserAuth = require('./UserAuth');  

// 定義關聯
ChatRoom.hasMany(Message, { foreignKey: 'chatRoomId' });
Message.belongsTo(ChatRoom, { foreignKey: 'chatRoomId' });

Message.belongsTo(UserProfile, { foreignKey: 'userId' });
UserProfile.hasMany(Message, { foreignKey: 'userId' });

// 建立 UserProfile 和 UserAuth 之間的一對一關聯
UserProfile.hasOne(UserAuth, { foreignKey: 'userId' });
UserAuth.belongsTo(UserProfile, { foreignKey: 'userId' });

// 匯出所有模型
module.exports = {
  UserProfile,
  ChatRoom,
  Message,
  UserAuth};
