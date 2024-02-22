const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
    trim: true,
  },
  schedule: [{
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie', // Reference to the Movie model
      required: true,
    },
    showtime: {
      type: Date,
      required: true,
    },
  }],
});

const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema;
