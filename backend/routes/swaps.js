const express = require('express');
const router = express.Router();
const { 
  createSwapRequest, 
  getSwapRequests, 
  updateSwapRequest, 
  deleteSwapRequest, 
  getSentSwapRequests 
} = require('../controllers/swapController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createSwapRequest);
router.get('/', protect, getSwapRequests);
router.get('/sent', protect, getSentSwapRequests);
router.patch('/:id', protect, updateSwapRequest);
router.delete('/:id', protect, deleteSwapRequest);

module.exports = router;