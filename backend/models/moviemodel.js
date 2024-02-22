const mongoose = require('mongoose');

// Check if the model is already defined to avoid overwriting
const Movie = mongoose.models.Movie || mongoose.model('Movie', {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  overview: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  genre: [{
    type: String,
    required: true,
    trim: true,
  }],
  trailerUrl: {
    type: String,
    required: true,
  },
  showtimes: [{
    type: Date,
  }],
});

module.exports = Movie;
