const Recommendation = require('../models/recommendationmodel');

const recommendationController = {
  addRecommendation: async (req, res) => {
    const { userId, movieId } = req.body;
    try {
      let recommendation = await Recommendation.findOne({ userId });

      if (!recommendation) {
        recommendation = new Recommendation({ userId, recommendedMovies: [movieId] });
      } else {
        recommendation.recommendedMovies.push(movieId);
      }

      await recommendation.save();
      res.json({ success: true, message: 'Recommendation added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getUserRecommendations: async (req, res) => {
    const { userId } = req.params;
    try {
      const recommendation = await Recommendation.findOne({ userId })
        .populate('recommendedMovies', 'title overview releaseDate genre');

      if (!recommendation) {
        return res.status(404).json({ success: false, message: 'Recommendations not found' });
      }

      res.json({ success: true, data: recommendation.recommendedMovies });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  updateRecommendations: async (req, res) => {
    const { userId, recommendedMovies } = req.body;
    try {
      let recommendation = await Recommendation.findOne({ userId });

      if (!recommendation) {
        recommendation = new Recommendation({ userId, recommendedMovies });
      } else {
        recommendation.recommendedMovies = recommendedMovies;
      }

      await recommendation.save();
      res.json({ success: true, message: 'Recommendations updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
};

module.exports = recommendationController;
