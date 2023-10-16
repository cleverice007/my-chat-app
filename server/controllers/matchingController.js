const { Op } = require('sequelize');
const UserMatching = require('../models/UserMatching');
const UserProfile = require('../models/UserProfile');

async function getUnmatchedProfiles(userId, idealAgeRange, idealLocation, idealGender) {
  const whereConditions = {
    age: { [Op.between]: idealAgeRange },
    location: { [Op.in]: idealLocation },
    gender: { [Op.in]: idealGender }
  };

  const allMatches = await UserMatching.findAll({
    attributes: ['user1Id', 'user2Id'],
    where: {
      [Op.or]: [
        { user1Id: userId },
        { user2Id: userId }
      ]
    }
  });

  const matchedUserIds = allMatches.map(match => 
    match.user1Id === userId ? match.user2Id : match.user1Id
  );

  const profiles = await UserProfile.findAll({
    attributes: ['userId'],
    where: {
      ...whereConditions,
      userId: {
        [Op.and]: [
          { [Op.ne]: userId },
          { [Op.notIn]: matchedUserIds }
        ]
      }
    }
  });

  return profiles.map(profile => profile.userId);
}

async function getPendingMatches(userId) {
  const allMatches = await UserMatching.findAll({
    where: {
      [Op.or]: [
        { user1Id: userId },
        { user2Id: userId }
      ]
    }
  });

  return allMatches.filter(match => 
    (match.user1Id === userId && match.user1Status === 'pending') || 
    (match.user2Id === userId && match.user2Status === 'pending')
  ).map(match => match.user1Id === userId ? match.user2Id : match.user1Id);
}

module.exports.getPotentialMatches = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Bad Request: userId is missing' });
    }

    const user = await UserProfile.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { idealAgeRange, idealLocation, idealGender } = user;

    const unmatchedUserIds = await getUnmatchedProfiles(userId, idealAgeRange, idealLocation, idealGender);
    const pendingUserIds = await getPendingMatches(userId);

    const allPotentialUserIds = [...new Set([...unmatchedUserIds, ...pendingUserIds])];

    const potentialProfiles = await UserProfile.findAll({
      attributes: ['profilePicture', 'name', 'age', 'gender', 'aboutMe', 'interests', 'location'],
      where: {
        userId: { [Op.in]: allPotentialUserIds }
      }
    });

    res.json(potentialProfiles);

  } catch (error) {
    console.log("Error fetching potential User Matches:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
