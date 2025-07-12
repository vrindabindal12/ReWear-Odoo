const asyncHandler = require('express-async-handler');
const Joi = require('joi');
const Item = require('../models/Item');
const User = require('../models/User');
const SwapRequest = require('../models/SwapRequest');

const moderateItemSchema = Joi.object({
  status: Joi.string().valid('approved', 'rejected').required(),
  rejectionReason: Joi.string().when('status', {
    is: 'rejected',
    then: Joi.required(),
    otherwise: Joi.optional()
  })
});

// @route   GET /api/admin/items/pending
// @desc    Get all pending items for moderation
// @access  Private (Admin only)
const getPendingItems = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const items = await Item.find({ status: 'pending' })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum);

  const total = await Item.countDocuments({ status: 'pending' });
  const totalPages = Math.ceil(total / limitNum);

  res.json({
    items,
    pagination: {
      currentPage: pageNum,
      totalPages,
      totalItems: total,
      hasNext: pageNum < totalPages,
      hasPrev: pageNum > 1
    }
  });
});

// @route   PUT /api/admin/items/:id/moderate
// @desc    Approve or reject an item
// @access  Private (Admin only)
const moderateItem = asyncHandler(async (req, res) => {
  const { error } = moderateItemSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { status, rejectionReason } = req.body;
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  item.status = status;
  item.moderatedBy = req.user._id;
  item.moderatedAt = new Date();

  if (status === 'rejected') {
    item.rejectionReason = rejectionReason;
    item.isAvailable = false;
  } else if (status === 'approved') {
    item.isAvailable = true;
  }

  await item.save();

  res.json(item);
});

// @route   DELETE /api/admin/items/:id
// @desc    Delete an item (admin override)
// @access  Private (Admin only)
const deleteItemAdmin = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  // Cancel any pending swap requests for this item
  await SwapRequest.updateMany(
    { itemId: item._id, status: 'pending' },
    { status: 'declined' }
  );

  await item.deleteOne();
  res.status(204).send();
});

// @route   GET /api/admin/stats
// @desc    Get admin dashboard statistics
// @access  Private (Admin only)
const getAdminStats = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    totalItems,
    pendingItems,
    approvedItems,
    rejectedItems,
    totalSwaps,
    pendingSwaps,
    completedSwaps
  ] = await Promise.all([
    User.countDocuments(),
    Item.countDocuments(),
    Item.countDocuments({ status: 'pending' }),
    Item.countDocuments({ status: 'approved' }),
    Item.countDocuments({ status: 'rejected' }),
    SwapRequest.countDocuments(),
    SwapRequest.countDocuments({ status: 'pending' }),
    SwapRequest.countDocuments({ status: 'completed' })
  ]);

  // Get recent activity
  const recentItems = await Item.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select('title uploaderName createdAt status');

  const recentSwaps = await SwapRequest.find()
    .sort({ createdDate: -1 })
    .limit(5)
    .select('itemTitle requesterName status createdDate');

  res.json({
    stats: {
      totalUsers,
      totalItems,
      pendingItems,
      approvedItems,
      rejectedItems,
      totalSwaps,
      pendingSwaps,
      completedSwaps
    },
    recentActivity: {
      recentItems,
      recentSwaps
    }
  });
});

// @route   GET /api/admin/users
// @desc    Get all users with pagination
// @access  Private (Admin only)
const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, search } = req.query;
  
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const users = await User.find(filter)
    .select('-password')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum);

  const total = await User.countDocuments(filter);
  const totalPages = Math.ceil(total / limitNum);

  res.json({
    users,
    pagination: {
      currentPage: pageNum,
      totalPages,
      totalItems: total,
      hasNext: pageNum < totalPages,
      hasPrev: pageNum > 1
    }
  });
});

// @route   PUT /api/admin/users/:id/role
// @desc    Update user role
// @access  Private (Admin only)
const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  
  if (!['user', 'admin'].includes(role)) {
    res.status(400);
    throw new Error('Invalid role');
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.role = role;
  await user.save();

  const updatedUser = await User.findById(user._id).select('-password');
  res.json(updatedUser);
});

// @route   GET /api/admin/items
// @desc    Get all items with filtering for admin
// @access  Private (Admin only)
const getAllItemsAdmin = asyncHandler(async (req, res) => {
  const { 
    page = 1, 
    limit = 20, 
    status,
    search
  } = req.query;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const filter = {};
  if (status) filter.status = status;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { uploaderName: { $regex: search, $options: 'i' } }
    ];
  }

  const items = await Item.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNum);

  const total = await Item.countDocuments(filter);
  const totalPages = Math.ceil(total / limitNum);

  res.json({
    items,
    pagination: {
      currentPage: pageNum,
      totalPages,
      totalItems: total,
      hasNext: pageNum < totalPages,
      hasPrev: pageNum > 1
    }
  });
});

module.exports = {
  getPendingItems,
  moderateItem,
  deleteItemAdmin,
  getAdminStats,
  getAllUsers,
  updateUserRole,
  getAllItemsAdmin
};