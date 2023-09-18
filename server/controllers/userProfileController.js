const UserProfile = require('../models/UserProfile'); 

module.exports.submitUserProfile = async (req, res) => {
  const userProfileData = req.body;
  console.log("User Profile Data:", userProfileData);

  try {
    const newUserProfile = await UserProfile.create({
      profilePicture: userProfileData.profilePicture,
      name: userProfileData.name,
      age: userProfileData.age,
      gender: userProfileData.gender,
      aboutMe: userProfileData.aboutMe,
      interests: userProfileData.interests,
      location: userProfileData.location,
    });

    console.log('New User Profile Created:', newUserProfile);
    res.json({ message: "User profile submitted successfully!" });
  } catch (error) {
    console.log("Error Creating User Profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
