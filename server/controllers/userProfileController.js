const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const UserProfile = require('../models/UserProfile');

// 初始化 S3 服務
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

module.exports.submitUserProfile = async (req, res) => {
  const userProfileData = req.body;
  const file = req.files.profilePicture;
  const fileName = `${Date.now()}_${file.name}`;

  const uploadParams = {
    Bucket: 'tinder-clone-mason',
    Key: fileName,
    Body: file.data
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);
    
    const interestsArray = JSON.parse(userProfileData.interests);  // 解析 JSON 字串為陣列

    const newUserProfile = await UserProfile.create({
      profilePicture: `https://${uploadParams.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`,
      name: userProfileData.name,
      age: userProfileData.age,
      gender: userProfileData.gender,
      aboutMe: userProfileData.aboutMe,
      interests: interestsArray,  // 使用解析後的陣列
      location: userProfileData.location
    });
  
    res.json({ message: "User profile submitted successfully!" });
  } catch (error) {
    console.log("Error Creating User Profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};