const express = require('express');
const router = express.Router();
const roomController = require('../controller/room.controller');
const { protect, adminOnly } = require('../middleware/auth.middleware');

// CRUD Rooms
router.get('/', roomController.getRooms);
router.get('/:id', roomController.getRoomById);
router.put('/:id', roomController.updateRoom);
router.get('/byhotel/:hotelId', roomController.getRoomsByHotel);
router.post('/add', protect, adminOnly, roomController.createRoom);
router.delete('/:id', protect, adminOnly, roomController.deleteRoom);


module.exports = router;
