const mongoose = require('mongoose');
const Room = require('./models/rooms.model');   // مسار الموديل بتاع الغرف
const Hotel = require('./models/Hotels.model'); // مسار الموديل بتاع الفنادق

mongoose.connect('mongodb://127.0.0.1:27017/Hotels')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

const roomTypes = [
  { type: 'Single', capacity: 1, basePrice: 50 },
  { type: 'Double', capacity: 2, basePrice: 100 },
  { type: 'Suite', capacity: 3, basePrice: 150 },
];

async function seedRooms() {
  const hotels = await Hotel.find();

  for (const hotel of hotels) {
    for (let i = 0; i < 10; i++) {
      const randomType = roomTypes[Math.floor(Math.random() * roomTypes.length)];
      
      const room = await Room.create({
        hotel: hotel._id,
        roomType: randomType.type,
        capacity: randomType.capacity,
        price: randomType.basePrice + Math.floor(Math.random() * 50), // زيادة سعر عشوائية
        status: 'available'
      });

      await Hotel.findByIdAndUpdate(hotel._id, { $push: { rooms: room._id } });
    }
    console.log(`✅ Added 10 rooms to hotel: ${hotel.name}`);
  }

  console.log('🎉 All rooms added successfully!');
  mongoose.connection.close();
}

seedRooms();
