const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const UserProfile = require('./UserProfile');
const ChatRoom = require('./ChatRoom');
const Message = require('./Message');
const UserAuth = require('./UserAuth');  
const UserMatching = require('./UserMatching'); 

// 定義關聯
ChatRoom.hasMany(Message, { foreignKey: 'chatRoomId' });
Message.belongsTo(ChatRoom, { foreignKey: 'chatRoomId' });

Message.belongsTo(UserProfile, { foreignKey: 'userId' });
UserProfile.hasMany(Message, { foreignKey: 'userId' });

// 建立 UserProfile 和 UserAuth 之間的一對一關聯
UserAuth.hasOne(UserProfile, { foreignKey: 'userId' });
UserProfile.belongsTo(UserAuth, { foreignKey: 'userId' });

// 建立 UserAuth 和 UserMatching 之間的一對多關聯
UserAuth.hasMany(UserMatching, { foreignKey: 'user1Id' });
UserAuth.hasMany(UserMatching, { foreignKey: 'user2Id' });
UserMatching.belongsTo(UserAuth, { as: 'User1', foreignKey: 'user1Id' });
UserMatching.belongsTo(UserAuth, { as: 'User2', foreignKey: 'user2Id' });


// 匯出所有模型
module.exports = {
  UserProfile,
  ChatRoom,
  Message,
  UserAuth,
  UserMatching,};
