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
      key: 'id'  // 對應userauth 自動生成的id
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
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  idealLocation: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  idealGender: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  matchedUsers: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
});

module.exports = UserProfile;
