const express = require('express');
const router = express.Router();
const bookingController = require('../controller/booking.controller');
const { protect , adminOnly } = require('../middleware/auth.middleware');


// Bookings

router.post('/',bookingController.createBooking);      // Make a booking
router.get('/all', protect, adminOnly, bookingController.getAllBookings);     // Get all bookings
router.get('/mybookings' , bookingController.getMyBookings); 
router.get('/:id', bookingController.getBookingById);   // Get booking by ID
router.put('/:id', bookingController.updateBooking);    // Update booking status
router.delete('/:id', bookingController.deleteBooking); // Cancel booking
  

module.exports = router;
