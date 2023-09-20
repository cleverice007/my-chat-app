const { S3Client } = require("@aws-sdk/client-s3");
const multer = require('multer');
const multerS3 = require('multer-s3');
const UserProfile = require('../models/UserProfile');


// 初始化 S3 服務
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'tinder-clone-mason',
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  })
});

module.exports.submitUserProfile = upload.single('profilePicture'), async (req, res) => {
  const userProfileData = req.body;
  const file = req.file; 
  const fileName = file.key;

  try {
    const interestsArray = JSON.parse(userProfileData.interests);

    const newUserProfile = await UserProfile.create({
      profilePicture: file.location, // 這裡是上傳到 S3 後得到的 URL
      name: userProfileData.name,
      age: userProfileData.age,
      gender: userProfileData.gender,
      aboutMe: userProfileData.aboutMe,
      interests: interestsArray,
      location: userProfileData.location
    });

    res.json({ message: "User profile submitted successfully!" });
  } catch (error) {
    console.log("Error Creating User Profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
