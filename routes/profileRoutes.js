// profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticateUser } = require('../middlewares/authMiddleware');

// get public as well as private users
router.get('/:userId', profileController.getProfile);
router.get('/public_private/:userId',authenticateUser , profileController.listProfiles);

module.exports = router;
