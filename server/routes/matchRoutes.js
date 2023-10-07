const express = require('express');
const router = express.Router();
const matchingController = require('../controllers/matchingController'); 

// 潛在配對路由
router.get('/api/potentialMatches', matchingController.getPotentialMatches);

module.exports = router;
