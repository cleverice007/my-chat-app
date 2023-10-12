const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserProfile = sequelize.define('UserProfile', {
  userId: {  
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    references: {
      model: 'UserAuths',
      key: 'id'  // 對應到 UserAuth 的自動生成的 id
    }
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aboutMe: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  interests: {
    type: DataTypes.JSON,  
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  idealAgeRange: {
    type: DataTypes.JSON, 
    allowNull: true,
  },
  idealLocation: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  idealGender: {
    type: DataTypes.JSON,  
    allowNull: true,
  },
  matchedUsers: {
    type: DataTypes.JSON, 
    allowNull: true,
  },
});

module.exports = UserProfile;

