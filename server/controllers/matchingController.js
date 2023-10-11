const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const UserProfile = require('../models/UserProfile');  // 引入UserProfile模型

module.exports.getPotentialMatches = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Bad Request: userId is missing' });
    }

    // 尋找status 為pending的配對
    const pendingMatches = await UserMatching.findAll({
      where: {
        [Op.or]: [
          { user1Id: userId },
          { user2Id: userId }
        ],
        status: 'pending'
      }
    });

    const pendingUserIds = pendingMatches.map(match =>
      match.user1Id === userId ? match.user2Id : match.user1Id
    );

    const user = await UserProfile.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { idealAgeRange, idealLocation, idealGender } = user;
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

    // 包含pending的用户，但排除已經配對過的用户＆自己
    const potentialMatches = await UserProfile.findAll({
      attributes: ['profilePicture', 'name', 'age', 'gender', 'aboutMe', 'interests', 'location'],
      where: {
        ...whereConditions,
        userId: {
          [Op.and]: [
            { [Op.ne]: userId },
            { [Op.notIn]: pendingUserIds }
          ]
        }
      }
    });

    res.json(potentialMatches);

  } catch (error) {
    console.log("Error fetching potential User Matches:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

