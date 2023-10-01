const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserAuth = require('../models/UserAuth'); 

// 註冊用戶
module.exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 檢查email是否已存在
    const existingUser = await UserAuth.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 加密密碼
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 新增記錄到 UserAuth 表中
    const newUserAuth = await UserAuth.create({
      email,
      password: hashedPassword
    });

    // 創建 JWT
    const token = jwt.sign({ id: newUserAuth.id }, 'yourSecretKey', { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      message: 'User registered successfully',
      token
    });
  } catch (error) {
    console.log('Error Registering User:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 登錄用戶
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
