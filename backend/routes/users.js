const express = require('express');
const router = express.Router();
const { 
  getProfile, 
  updateProfile, 
  changePassword, 
  getUserStats 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/me', protect, getProfile);
router.put('/me', protect, updateProfile);
router.put('/me/password', protect, changePassword);
router.get('/me/stats', protect, getUserStats);

module.exports = router;