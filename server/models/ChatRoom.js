const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChatRoom = sequelize.define('ChatRoom', {
  chatRoomId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user1Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user_profiles',
      key: 'userId',
    },
  },
  user2Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user_profiles', 
      key: 'userId',
    },
  },
  roomName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = ChatRoom;
