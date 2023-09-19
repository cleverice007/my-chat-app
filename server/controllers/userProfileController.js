const UserProfile = require('../models/UserProfile'); 
const AWS = require('aws-sdk');

// 初始化 S3 服務
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});


module.exports.submitUserProfile = async (req, res) => {
  const userProfileData = req.body;

  // 取得上傳的檔案
  const file = req.files.profilePicture;
  const fileName = `${Date.now()}_${file.name}`;

  // S3 上傳參數
  const uploadParams = {
    Bucket: 'tinder-clone-mason',
    Key: fileName,
    Body: file.data
  };

  try {
    // 上傳到 S3
    const s3Data = await s3.upload(uploadParams).promise();

    // 現在 s3Data.Location 包含了上傳圖片的 URL
    const newUserProfile = await UserProfile.create({
      profilePicture: s3Data.Location,  // 將 S3 URL 儲存
      name: userProfileData.name,
      age: userProfileData.age,
      gender: userProfileData.gender,
      aboutMe: userProfileData.aboutMe,
      interests: userProfileData.interests,
      location: userProfileData.location
    });

    console.log('New User Profile Created:', newUserProfile);
    res.json({ message: "User profile submitted successfully!" });
  } catch (error) {
    console.log("Error Creating User Profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};