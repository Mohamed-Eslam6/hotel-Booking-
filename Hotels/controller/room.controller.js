const Room = require('../models//rooms.model');
const Hotel = require('../models/Hotels.model');

exports.createRoom = async (req, res) => {
  try {
    const { hotelId, roomType, capacity, price, imageUrl } = req.body;
    const room = await Room.create({ hotel: hotelId, roomType, capacity, price, imageUrl });
    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: room._id } });
    res.status(201).json({ message: 'Room created and linked to hotel', room });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};





// Get All Rooms
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('hotel');
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('hotel', 'name location pricePerNight');
    if (!room) return res.status(404).json({ message: 'Room not found' });

    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Room
exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Room
exports.deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByIdAndDelete(id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    await Hotel.updateOne({ rooms: id }, { $pull: { rooms: id } });
    res.json({ message: 'Room deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRoomsByHotel = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const rooms = await Room.find({ hotel: hotelId });
    if (!rooms.length) return res.status(404).json({ message: 'No rooms found for this hotel' });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
