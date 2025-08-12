const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  pricePerNight: { type: Number, required: true },
  imageUrl: { type: String, default: "" }, 
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
  rating: { type: Number, default: 4 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hotel', hotelSchema);
