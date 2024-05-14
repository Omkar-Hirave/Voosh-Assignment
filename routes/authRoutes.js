// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const authMiddleware = require('../middlewares/authMiddleware')
router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/update', authMiddleware.authenticateUser,  authController.updateProfile);
router.get('/myProfileDetails', authMiddleware.authenticateUser,  authController.myProfileDetails);


module.exports = router;
