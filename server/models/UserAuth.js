const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserAuth = sequelize.define('UserAuth', {
  // Sequelize 會自動創造id作為primary key
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
