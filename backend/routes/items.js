const express = require('express');
const router = express.Router();
const { createItem, getUserItems } = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
fs.mkdir(uploadDir, { recursive: true }).catch((err) => {
  console.error('Failed to create uploads directory:', err);
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Error handling for multer
const uploadMiddleware = (req, res, next) => {
  upload.array('images', 5)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: `Multer error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

router.post('/', protect, uploadMiddleware, createItem);
router.get('/me', protect, getUserItems);

module.exports = router;