const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserMatching = sequelize.define('UserMatching', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user1Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'UserAuths',  
      key: 'id'
    }
  },
  user2Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'UserAuths', 
      key: 'id'
    }
  },
  user1Status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending' // 可以是 'pending', 'accepted', 'rejected'
  },
  user2Status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending' // 可以是 'pending', 'accepted', 'rejected'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
  }
});

module.exports = UserMatching;
