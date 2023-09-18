module.exports.submitUserProfile = (req, res) => {
    const userProfileData = req.body;
    console.log("User Profile Data:", userProfileData);
  
    res.json({ message: "User profile submitted successfully!" });
  };