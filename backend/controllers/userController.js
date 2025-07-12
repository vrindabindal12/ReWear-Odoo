const asyncHandler = require('express-async-handler');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const updateProfileSchema = Joi.object({
  name: Joi.string().trim().max(50).optional(),
  avatar: Joi.string().uri().optional(),
  location: Joi.string().trim().max(100).optional(),
  bio: Joi.string().trim().max(500).optional()
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required()
});

// @route   GET /api/users/me
// @desc    Get current user profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
});

// @route   PUT /api/users/me
// @desc    Update user profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const { error } = updateProfileSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update only provided fields
  Object.keys(req.body).forEach(key => {
    if (req.body[key] !== undefined) {
      user[key] = req.body[key];
    }
  });

  await user.save();

  // Return user without password
  const updatedUser = await User.findById(user._id).select('-password');
  res.json(updatedUser);
});

// @route   PUT /api/users/me/password
// @desc    Change user password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { error } = changePasswordSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);

  if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
    res.status(400);
    throw new Error('Current password is incorrect');
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: 'Password updated successfully' });
});

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Private
const getUserStats = asyncHandler(async (req, res) => {
  const Item = require('../models/Item');
  const SwapRequest = require('../models/SwapRequest');

  const [itemsListed, swapsSent, swapsReceived, completedSwaps] = await Promise.all([
    Item.countDocuments({ uploaderId: req.user._id }),
    SwapRequest.countDocuments({ requesterId: req.user._id }),
    SwapRequest.countDocuments({ 
      itemId: { $in: await Item.find({ uploaderId: req.user._id }).distinct('_id') }
    }),
    SwapRequest.countDocuments({ 
      $or: [
        { requesterId: req.user._id, status: 'completed' },
        { 
          itemId: { $in: await Item.find({ uploaderId: req.user._id }).distinct('_id') },
          status: 'completed'
        }
      ]
    })
  ]);

  res.json({
    itemsListed,
    swapsSent,
    swapsReceived,
    completedSwaps,
    points: req.user.points
  });
});

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  getUserStats
};