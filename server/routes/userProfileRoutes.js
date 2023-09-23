const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/userProfileController");

router.post("/api/userprofiles", userProfileController.uploadMiddleware, userProfileController.submitUserProfile);
router.get("/api/userprofiles", userProfileController.getAllUserProfiles);


module.exports = router;