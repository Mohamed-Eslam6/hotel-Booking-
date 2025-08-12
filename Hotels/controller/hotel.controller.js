const Hotel = require('../models/Hotels.model');

// Create Hotel
exports.createHotel = async (req, res) => {
  try {
    const { name, location, description, pricePerNight, imageUrl } = req.body;

    if (!name || !location || !pricePerNight) {
      return res.status(400).json({ error: 'Name, Location, and Price are required' });
    }

    const hotel = await Hotel.create({
      name,
      location,
      description,
      pricePerNight,
      imageUrl
    });

    res.status(201).json({ message: '✅ Hotel created successfully', hotel });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Hotels
exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Hotel by ID
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate('rooms');
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Hotel
exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(hotel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Hotel
exports.deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hotel deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
