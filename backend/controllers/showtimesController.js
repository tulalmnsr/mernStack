const Showtime = require('../models/showtimeModel');

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
  },

  // Fetch showtimes by cinema
  getShowtimesByCinema: async (req, res) => {
    const { cinemaName, userGenre } = req.body;

    try {
      const showtimes = await Showtime.find({
        cinema_name: cinemaName,
        genre: userGenre !== 'All' ? userGenre : { $exists: true }
      });

      res.json(showtimes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  // Fetch latest show dates
  getLatestShowDates: async (req, res) => {
    try {
      const latestShowDates = await Showtime.distinct('showtime_date');
      res.json(latestShowDates);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Fetch showtimes for a selected date
  getShowtimesByDate: async (req, res) => {
    const { selectedShowDate } = req.body;
    try {
      const showtimes = await Showtime.find({ showtime_date: selectedShowDate });
      res.json(showtimes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Fetch replacement movie options
  getReplacementMovies: async (req, res) => {
    // This function is removed since ReplacementMovie model is not imported
    res.status(404).json({ message: 'Not found' });
  },

  // Swap movies
  swapMovies: async (req, res) => {
    // This function is removed since ReplacementMovie model is not imported
    res.status(404).json({ message: 'Not found' });
  }
};

module.exports = showtimeController;
