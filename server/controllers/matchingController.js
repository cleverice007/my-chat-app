const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const UserProfile = require('../models/UserProfile');  // 引入UserProfile模型

module.exports.getPotentialMatches = async (req, res) => {
  try {
    // 從Authorization頭中獲取Bearer token
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.decode(token);
    
    const userId = decoded.id;  // 假設 userId 存儲在 decoded 的 'id' 字段里

    // 使用 userId 查找該用戶的理想配對條件
    const user = await UserProfile.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { idealAgeRange, idealLocation, idealGender } = user;
    
    // 建立查詢條件
    const whereConditions = {};
    
    if (idealAgeRange && idealAgeRange.length > 0) {
      whereConditions.age = { [Op.between]: idealAgeRange };
    }
    
    if (idealLocation && idealLocation.length > 0) {
      whereConditions.location = { [Op.in]: idealLocation };
    }
    
    if (idealGender && idealGender.length > 0) {
      whereConditions.gender = { [Op.in]: idealGender };
    }
    
    // 執行查詢，但排除當前用戶
    const potentialMatches = await UserProfile.findAll({
      where: {
        ...whereConditions,
        userId: {
          [Op.ne]: userId  // ne stands for 'not equal'
        }
      }
    });
    
    res.json(potentialMatches);
    
  } catch (error) {
    console.log("Error fetching potential User Matches:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
