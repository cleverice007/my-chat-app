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


module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 查找用戶
    const userAuth = await UserAuth.findOne({ where: { email } });
    if (!userAuth) {
      return res.status(400).json({ message: "Email not found" });
    }

    // 核對密碼
    const validPassword = await bcrypt.compare(password, userAuth.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 創建 JWT
    const token = jwt.sign({ userId: userAuth.id }, 'yourSecretKey', { expiresIn: '1h' });

    // 查找對應的 UserProfile
    const userProfile = await UserProfile.findOne({ where: { userId: userAuth.id } });

    // 返回結果
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      userProfile 
    });
  } catch (error) {
    console.log('Error Logging In User:', error);
    res.status(500).json({ message: 'Internal Server Error' });
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




