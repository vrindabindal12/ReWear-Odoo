const express = require('express');
const router = express.Router();
const { createSwapRequest, getSwapRequests, updateSwapRequest, deleteSwapRequest } = require('../controllers/swapController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createSwapRequest);
router.get('/', protect, getSwapRequests);
router.patch('/:id', protect, updateSwapRequest);
router.delete('/:id', protect, deleteSwapRequest);

module.exports = router;