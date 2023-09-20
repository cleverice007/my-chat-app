const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/userProfileController");

router.post("/userprofiles", userProfileController.uploadMiddleware, userProfileController.submitUserProfile);

module.exports = router;