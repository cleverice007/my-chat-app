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
const uploadMiddleware = upload.single('profilePicture');
module.exports.uploadMiddleware = uploadMiddleware;


// 提交 user profile
module.exports.submitUserProfile = async (req, res) => {
  const userProfileData = req.body;
  const file = req.file;

  try {
    const interestsArray = JSON.parse(userProfileData.interests);

    // 先檢查 userId 是否存在
    const existingUserProfile = await UserProfile.findOne({ where: { userId: userProfileData.userId } });

    let profilePictureLocation = existingUserProfile ? existingUserProfile.profilePicture : null;

    if (file) {
      profilePictureLocation = file.location;
    }

    const updateData = {
      profilePicture: profilePictureLocation,
      name: userProfileData.name,
      age: userProfileData.age,
      gender: userProfileData.gender,
      aboutMe: userProfileData.aboutMe,
      interests: interestsArray,
      location: userProfileData.location
    };

    if (existingUserProfile) {
      // 如果存在，更新記錄
      await UserProfile.update(updateData, { where: { userId: userProfileData.userId } });
    } else {
      // 如果不存在，創建新的記錄
      await UserProfile.create({
        userId: userProfileData.userId,
        ...updateData
      });
    }

    // 只返回 Redux 需要的屬性
    const filteredResponse = updateData;

    res.json(filteredResponse);

  } catch (error) {
    console.log("Error Creating User Profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// 返回所有user profile，chat 頁面的左邊欄位，最右邊欄位的個人資料部分
module.exports.getAllUserProfiles = async (req, res) => {
  try {
    const users = await UserProfile.findAll();
    res.json(users);
  } catch (error) {
    console.log("Error fetching all User Profiles:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




