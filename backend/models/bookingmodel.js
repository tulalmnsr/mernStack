const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie', // Reference to the Movie model
    required: true,
  },
  showtime: {
    type: Date,
    required: true,
  },
  seats: [{
    type: String,
  }],
  status: {
    type: String,
    required: true,
  },
  payment: {
    method: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
