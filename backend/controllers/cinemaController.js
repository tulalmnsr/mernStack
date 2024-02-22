const Cinema = require('../models/cinemamodel');

const cinemaController = {
  getAllCinemas: async (req, res) => {
    try {
      const cinemas = await Cinema.find();
      res.json({ success: true, data: cinemas });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getCinemaDetails: async (req, res) => {
    const { cinemaId } = req.params;
    try {
      const cinema = await Cinema.findById(cinemaId).populate('schedule.movieId');
      if (!cinema) {
        return res.status(404).json({ success: false, message: 'Cinema not found' });
      }
      res.json({ success: true, data: cinema });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  addCinema: async (req, res) => {
    const { name, location, contact, schedule } = req.body;
    try {
      const newCinema = new Cinema({ name, location, contact, schedule });
      await newCinema.save();
      res.json({ success: true, message: 'Cinema added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  updateCinema: async (req, res) => {
    const { cinemaId } = req.params;
    const { name, location, contact, schedule } = req.body;
    try {
      const cinema = await Cinema.findByIdAndUpdate(
        cinemaId,
        { name, location, contact, schedule },
        { new: true }
      ).populate('schedule.movieId');
      if (!cinema) {
        return res.status(404).json({ success: false, message: 'Cinema not found' });
      }
      res.json({ success: true, message: 'Cinema updated successfully', data: cinema });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  deleteCinema: async (req, res) => {
    const { cinemaId } = req.params;
    try {
      const cinema = await Cinema.findByIdAndDelete(cinemaId);
      if (!cinema) {
        return res.status(404).json({ success: false, message: 'Cinema not found' });
      }
      res.json({ success: true, message: 'Cinema deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
};

module.exports = cinemaController;
