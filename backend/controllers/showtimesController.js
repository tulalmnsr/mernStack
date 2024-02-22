// controllers/showtimeController.js

const Showtime = require('../models/Showtime');

const showtimeController = {
  // Create a new showtime
  createShowtime: async (req, res) => {
    try {
      const newShowtime = new Showtime(req.body);
      await newShowtime.save();
      res.status(201).json({ success: true, data: newShowtime });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  // Retrieve all showtimes
  getAllShowtimes: async (req, res) => {
    try {
      const showtimes = await Showtime.find();
      res.json({ success: true, data: showtimes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  // Update a showtime by ID
  updateShowtime: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedShowtime = await Showtime.findByIdAndUpdate(id, req.body, { new: true });
      res.json({ success: true, data: updatedShowtime });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  // Delete a showtime by ID
  deleteShowtime: async (req, res) => {
    const { id } = req.params;
    try {
      await Showtime.findByIdAndDelete(id);
      res.json({ success: true, message: 'Showtime deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
};
exports.getLatestShowDates = async (req, res) => {
  try {
    const latestShowDates = await Showtime.distinct('showtime_date');
    res.json(latestShowDates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getShowtimesByDate = async (req, res) => {
  const { selectedShowDate } = req.body;
  try {
    const showtimes = await Showtime.find({ showtime_date: selectedShowDate });
    res.json(showtimes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.getReplacementMovies = async (req, res) => {
  const { selectedShowtime } = req.body;
  try {
    const replacementMovies = await ReplacementMovie.find({ showtimeId: selectedShowtime });
    res.json(replacementMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.swapMovies = async (req, res) => {
  const { selectedAlt, selectedShowtime, selectedReplace } = req.body;
  try {
    // Find the showtime with the selected ID and update the movieId field
    await Showtime.updateOne({ _id: selectedShowtime }, { movieId: selectedAlt });
    res.status(200).json({ message: 'Movie swap successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = showtimeController;