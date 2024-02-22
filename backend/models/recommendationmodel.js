const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  recommendedMovies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie', // Reference to the Movie model
  }],
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;
