const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define('Message', {
  messageId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  chatRoomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ChatRooms',
      key: 'chatRoomId',
    },
  },
  from: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'UserProfiles',
      key: 'userId',
    },
  },
  to: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'UserProfiles',
      key: 'userId',
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Message;
