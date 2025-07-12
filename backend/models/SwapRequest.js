const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  requesterName: { type: String, required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  itemTitle: { type: String, required: true },
  offeredItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  offeredItemTitle: { type: String },
  type: { type: String, enum: ['swap', 'points'], required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'declined', 'completed'], 
    default: 'pending' 
  },
  message: { type: String },
  createdDate: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('SwapRequest', swapRequestSchema);