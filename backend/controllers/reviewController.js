const Review = require('../models/reviewsmodel');

const reviewController = {
  addReview: async (req, res) => {
    const { userId, movieId, rating, reviewText } = req.body;
    try {
      const existingReview = await Review.findOne({ userId, movieId });

      if (existingReview) {
        return res.status(400).json({ success: false, message: 'Review already exists' });
      }

      const review = new Review({ userId, movieId, rating, reviewText });
      await review.save();
      res.json({ success: true, message: 'Review added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getMovieReviews: async (req, res) => {
    const { movieId } = req.params;
    try {
      const reviews = await Review.find({ movieId })
        .populate('userId', 'username email');

      if (!reviews || reviews.length === 0) {
        return res.status(404).json({ success: false, message: 'Reviews not found' });
      }

      res.json({ success: true, data: reviews });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  updateReview: async (req, res) => {
    const { userId, movieId, rating, reviewText } = req.body;
    try {
      const review = await Review.findOneAndUpdate(
        { userId, movieId },
        { rating, reviewText },
        { new: true }
      );

      if (!review) {
        return res.status(404).json({ success: false, message: 'Review not found' });
      }

      res.json({ success: true, message: 'Review updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
};

module.exports = reviewController;
