const asyncHandler = require('express-async-handler');
const Joi = require('joi');
const Item = require('../models/Item');
const path = require('path');

const itemSchema = Joi.object({
  title: Joi.string().required().trim().max(100),
  description: Joi.string().required().trim().max(1000),
  category: Joi.string().valid('tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'accessories').required(),
  type: Joi.string().required().trim().max(50),
  size: Joi.string().required().trim().max(20),
  condition: Joi.string().valid('new', 'like-new', 'good', 'fair').required(),
  tags: Joi.array().items(Joi.string().trim().max(30)).max(10).optional(),
  pointValue: Joi.number().min(0).required(),
  location: Joi.string().trim().max(100).optional()
});

const updateItemSchema = Joi.object({
  title: Joi.string().trim().max(100).optional(),
  description: Joi.string().trim().max(1000).optional(),
  category: Joi.string().valid('tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'accessories').optional(),
  type: Joi.string().trim().max(50).optional(),
  size: Joi.string().trim().max(20).optional(),
  condition: Joi.string().valid('new', 'like-new', 'good', 'fair').optional(),
  tags: Joi.array().items(Joi.string().trim().max(30)).max(10).optional(),
  pointValue: Joi.number().min(0).optional(),
  location: Joi.string().trim().max(100).optional()
});

// @route   GET /api/items
// @desc    Get all available items with filtering and pagination
// @access  Public
const getAllItems = asyncHandler(async (req, res) => {
  const { 
    page = 1, 
    limit = 20, 
    category, 
    condition, 
    size, 
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    minPoints,
    maxPoints
  } = req.query;

  // Build filter object
  const filter = { isAvailable: true, status: 'approved' };
  
  if (category) filter.category = category;
  if (condition) filter.condition = condition;
  if (size) filter.size = size;
  if (minPoints || maxPoints) {
    filter.pointValue = {};
    if (minPoints) filter.pointValue.$gte = parseInt(minPoints);
    if (maxPoints) filter.pointValue.$lte = parseInt(maxPoints);
  }

  // Build search query
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } }
    ];
  }

  // Build sort object
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const items = await Item.find(filter)
    .sort(sort)
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

// @route   GET /api/items/:id
// @desc    Get item by ID
// @access  Public
const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  res.json(item);
});

// @route   PUT /api/items/:id
// @desc    Update item
// @access  Private (item owner only)
const updateItem = asyncHandler(async (req, res) => {
  const { error } = updateItemSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const item = await Item.findById(req.params.id);
  
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  // Check if user owns the item
  if (item.uploaderId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this item');
  }

  // Handle tags input
  let tags = req.body.tags;
  if (typeof tags === 'string') {
    try {
      tags = JSON.parse(tags);
    } catch (e) {
      tags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }
  }

  const updateData = { ...req.body };
  if (tags) updateData.tags = tags;

  // If item was modified, set status back to pending for admin approval
  if (Object.keys(updateData).length > 0) {
    updateData.status = 'pending';
  }

  const updatedItem = await Item.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true }
  );

  res.json(updatedItem);
});

// @route   DELETE /api/items/:id
// @desc    Delete item
// @access  Private (item owner only)
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  // Check if user owns the item
  if (item.uploaderId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this item');
  }

  await item.deleteOne();
  res.status(204).send();
});
const createItem = asyncHandler(async (req, res) => {
  // Handle tags input: parse JSON string or convert single/multiple form-data tags to array
  let tags = req.body.tags;
  if (typeof tags === 'string') {
    try {
      tags = JSON.parse(tags); // Try parsing if it's a JSON string
    } catch (e) {
      tags = tags.split(',').map(tag => tag.trim()).filter(tag => tag); // Fallback to comma-separated string
    }
  } else if (!Array.isArray(tags)) {
    tags = tags ? [tags] : []; // Handle single tag or undefined
  }

  // Ensure tags is an array
  if (!Array.isArray(tags)) {
    res.status(400);
    throw new Error('Tags must be an array or a valid JSON string of tags');
  }

  const { error } = itemSchema.validate({ ...req.body, tags });
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { title, description, category, type, size, condition, pointValue, location } = req.body;

  // Handle image uploads
  const images = [];
  if (req.files && Array.isArray(req.files)) {
    for (const file of req.files) {
      images.push(`/uploads/${file.filename}`);
    }
  }

  if (images.length === 0) {
    res.status(400);
    throw new Error('At least one image is required');
  }

  const item = await Item.create({
    title,
    description,
    category,
    type,
    size,
    condition,
    tags,
    images,
    uploaderId: req.user._id,
    uploaderName: req.user.name,
    uploaderAvatar: req.user.avatar,
    pointValue,
    location,
    status: 'pending' // Items need admin approval
  });

  res.status(201).json(item);
});

const getUserItems = asyncHandler(async (req, res) => {
  const items = await Item.find({ uploaderId: req.user._id }).sort({ createdAt: -1 });
  res.json(items);
});

module.exports = { 
  createItem, 
  getUserItems, 
  getAllItems, 
  getItemById, 
  updateItem, 
  deleteItem 
};