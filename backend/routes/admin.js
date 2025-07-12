const express = require('express');
const router = express.Router();
const {
  getPendingItems,
  moderateItem,
  deleteItemAdmin,
  getAdminStats,
  getAllUsers,
  updateUserRole,
  getAllItemsAdmin
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

// Apply protection and admin check to all routes
router.use(protect);
router.use(adminOnly);

// Dashboard stats
router.get('/stats', getAdminStats);

// Item management
router.get('/items', getAllItemsAdmin);
router.get('/items/pending', getPendingItems);
router.put('/items/:id/moderate', moderateItem);
router.delete('/items/:id', deleteItemAdmin);

// User management
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);

module.exports = router;