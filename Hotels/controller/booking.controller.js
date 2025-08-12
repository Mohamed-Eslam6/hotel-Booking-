const Booking = require('../models/booking.model');
const Room = require('../models/rooms.model');
const User = require('../models/user.model');


exports.createBooking = async (req, res) => {
  try {
    const { room, checkIn, checkOut, paymentMethod, cardNumber, userEmail } = req.body;
    const user = await User.findOne({ email: req.body.userEmail });


    if (!room || !checkIn || !checkOut || !userEmail) {
      return res.status(400).json({ message: '❌ Missing booking data (room, dates, userEmail required)' });
    }

    const roomData = await Room.findById(room);
    if (!roomData) return res.status(404).json({ message: 'Room not found' });
    if (roomData.status === 'booked') return res.status(400).json({ message: 'Room already booked' });

    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    if (nights <= 0) return res.status(400).json({ message: 'Invalid dates' });

    const totalPrice = (roomData.price || 0) * nights;

    const booking = await Booking.create({
      user: user ? user._id : null,
      userEmail,
      room,
      totalPrice,
      checkIn,
      checkOut,
      paymentMethod: paymentMethod || 'cash',
      cardNumber: paymentMethod === 'card' ? cardNumber : undefined
    });

    roomData.status = 'booked';
    await roomData.save();

    res.status(201).json({ message: '✅ Booking created successfully', booking });

  } catch (err) {
    console.error('❌ Booking Error:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};


// Get All Bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
  .populate({
    path: 'room',
    select: 'roomType price',
    populate: { path: 'hotel', select: 'name location' }
  });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get Booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user').populate('room');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Booking
exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getMyBookings = async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const bookings = await Booking.find({ userEmail: email })
      .populate({
        path: 'room',
        select: 'roomType price hotel',
        populate: { path: 'hotel', select: 'name location pricePerNight' }
      });

    res.json({ bookings: bookings || [] });
  } catch (err) {
    console.error("❌ MyBookings Error:", err);
    res.status(500).json({ error: err.message });
  }
};





