const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
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
    required: true,
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
  guestInfo: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
