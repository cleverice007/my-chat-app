const { Op } = require('sequelize');
const UserProfile = require('../models/UserProfile');


module.exports.getMatchingProfiles = async (req, res) => {
  try {
    // 從 URL 中的 query parameters 獲取 userId
    const { userId } = req.query;

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
    const matchingUsers = await UserProfile.findAll({
      where: {
        ...whereConditions,
        userId: {
          [Op.ne]: userId  // ne stands for 'not equal'
        }
      }
    });

    res.json(matchingUsers);
  } catch (error) {
    console.log("Error fetching matching User Profiles:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
