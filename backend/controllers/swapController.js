const asyncHandler = require('express-async-handler');
const Joi = require('joi');
const SwapRequest = require('../models/SwapRequest');
const Item = require('../models/Item');
const User = require('../models/User');

const swapRequestSchema = Joi.object({
  itemId: Joi.string().required(),
  type: Joi.string().valid('swap', 'points').required(),
  offeredItemId: Joi.string().when('type', { is: 'swap', then: Joi.required(), otherwise: Joi.optional() }),
  message: Joi.string().trim().max(500).optional()
});

const updateSwapSchema = Joi.object({
  status: Joi.string().valid('accepted', 'declined').required()
});

const createSwapRequest = asyncHandler(async (req, res) => {
  const { error } = swapRequestSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { itemId, type, offeredItemId, message } = req.body;

  const item = await Item.findById(itemId);
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  if (!item.isAvailable) {
    res.status(400);
    throw new Error('Item is not available');
  }

  if (item.uploaderId.toString() === req.user._id.toString()) {
    res.status(400);
    throw new Error('Cannot request your own item');
  }

  let offeredItemTitle;
  if (type === 'swap' && offeredItemId) {
    const offeredItem = await Item.findById(offeredItemId);
    if (!offeredItem) {
      res.status(404);
      throw new Error('Offered item not found');
    }
    if (offeredItem.uploaderId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('You can only offer your own items');
    }
    offeredItemTitle = offeredItem.title;
  }

  if (type === 'points' && req.user.points < item.pointValue) {
    res.status(400);
    throw new Error('Insufficient points');
  }

  const swapRequest = await SwapRequest.create({
    requesterId: req.user._id,
    requesterName: req.user.name,
    itemId,
    itemTitle: item.title,
    offeredItemId: type === 'swap' ? offeredItemId : undefined,
    offeredItemTitle,
    type,
    message
  });

  res.status(201).json(swapRequest);
});

const getSwapRequests = asyncHandler(async (req, res) => {
  // Find swap requests for items owned by the authenticated user
  const items = await Item.find({ uploaderId: req.user._id }).select('_id');
  const itemIds = items.map(item => item._id);
  const swapRequests = await SwapRequest.find({ itemId: { $in: itemIds } })
    .sort({ createdDate: -1 });
  res.json(swapRequests);
});

const updateSwapRequest = asyncHandler(async (req, res) => {
  const { error } = updateSwapSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const swapRequest = await SwapRequest.findById(req.params.id);
  if (!swapRequest) {
    res.status(404);
    throw new Error('Swap request not found');
  }

  const item = await Item.findById(swapRequest.itemId);
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  if (item.uploaderId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this swap request');
  }

  if (swapRequest.status !== 'pending') {
    res.status(400);
    throw new Error('Swap request is not pending');
  }

  const { status } = req.body;

  if (status === 'accepted') {
    // Update item availability
    item.isAvailable = false;
    await item.save();

    if (swapRequest.type === 'points') {
      // Deduct points from requester
      const requester = await User.findById(swapRequest.requesterId);
      requester.points -= item.pointValue;
      await requester.save();
    } else if (swapRequest.type === 'swap' && swapRequest.offeredItemId) {
      // Mark offered item as unavailable
      const offeredItem = await Item.findById(swapRequest.offeredItemId);
      if (offeredItem) {
        offeredItem.isAvailable = false;
        await offeredItem.save();
      }
    }

    // Mark other swap requests for this item as declined
    await SwapRequest.updateMany(
      { itemId: swapRequest.itemId, _id: { $ne: swapRequest._id }, status: 'pending' },
      { status: 'declined' }
    );
  }

  swapRequest.status = status;
  await swapRequest.save();

  res.json(swapRequest);
});

const deleteSwapRequest = asyncHandler(async (req, res) => {
  const swapRequest = await SwapRequest.findById(req.params.id);
  if (!swapRequest) {
    res.status(404);
    throw new Error('Swap request not found');
  }

  if (swapRequest.requesterId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this swap request');
  }

  if (swapRequest.status !== 'pending') {
    res.status(400);
    throw new Error('Cannot delete non-pending swap request');
  }

  await swapRequest.deleteOne();
  res.status(204).send();
});

module.exports = { createSwapRequest, getSwapRequests, updateSwapRequest, deleteSwapRequest };