const mongoose = require('mongoose');
const Room = require('./models/rooms.model');
const Hotel = require('./models/Hotels.model'); // ✅ أضفت الاستدعاء ده

mongoose.connect('mongodb://127.0.0.1:27017/Hotels')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error(err));

// الصور لكل نوع
const roomImages = {
  single: [ '/assets/rooms/single1.webp','/assets/rooms/single2.webp','/assets/rooms/single3.webp','/assets/rooms/single4.webp','/assets/rooms/single5.webp' ],
  double: [ '/assets/rooms/double1.webp','/assets/rooms/double2.webp','/assets/rooms/double3.webp','/assets/rooms/double4.webp','/assets/rooms/double5.webp' ],
  suite:  [ '/assets/rooms/suite1.webp','/assets/rooms/suite2.webp','/assets/rooms/suite3.webp','/assets/rooms/suite4.webp','/assets/rooms/suite5.webp' ]
};

const getRandomImage = (type) => {
  const images = roomImages[type.toLowerCase()] || roomImages.single;
  return images[Math.floor(Math.random() * images.length)];
};

(async () => {
  try {
    const rooms = await Room.find().populate('hotel'); // ✅ شغال بعد ما عرفنا موديل Hotel
    for (const room of rooms) {
      const type = room.roomType.toLowerCase();
      room.imageUrl = getRandomImage(type);
      await room.save();
      console.log(`🏨 ${room.hotel?.name || 'Unknown'} | ${room.roomType} => ${room.imageUrl}`);
    }
    console.log('🎉 All room images updated successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
})();
