const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
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

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  booking: [bookingSchema],
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;
