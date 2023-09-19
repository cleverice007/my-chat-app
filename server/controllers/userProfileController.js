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
    
    const newUserProfile = await UserProfile.create({
      profilePicture: `https://${uploadParams.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`,  // 將 S3 URL 儲存
      name: userProfileData.name,
      age: userProfileData.age,
      gender: userProfileData.gender,
      aboutMe: userProfileData.aboutMe,
      interests: userProfileData.interests,
      location: userProfileData.location
    });
  
    res.json({ message: "User profile submitted successfully!" });
  } catch (error) {
    console.log("Error Creating User Profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
