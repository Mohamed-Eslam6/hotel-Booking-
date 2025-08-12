const express = require('express');
const router = express.Router();
const hotelController = require('../controller/hotel.controller');
const { protect, adminOnly } = require('../middleware/auth.middleware');

router.post('/add', protect, adminOnly, hotelController.createHotel);
router.get('/', hotelController.getHotels);
router.get('/:id', hotelController.getHotelById);
router.put('/:id', protect, adminOnly, hotelController.updateHotel);
router.delete('/:id', protect, adminOnly, hotelController.deleteHotel);

module.exports = router;
