const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  roomType: { type: String, required: true },                                               // Single, Double, Suite
  capacity: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['available', 'booked'], default: 'available' },
  imageUrl: { type: String }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', roomSchema);


