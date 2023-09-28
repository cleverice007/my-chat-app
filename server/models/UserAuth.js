const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserAuth = sequelize.define('UserAuth', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    references: {
      model: 'UserProfiles', // 對應到 UserProfile 的表名
      key: 'userId'
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

module.exports = UserAuth;
