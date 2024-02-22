// Import necessary dependencies
const Movie = require('../models/moviemodel');

const manageMoviesController = {
  // List all movies
  listMovies: async (req, res) => {
    try {
      const movies = await Movie.find();
      return res.status(200).json({ success: true, data: movies });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  },

  // Add a new movie
  addMovie: async (req, res) => {
    try {
      const newMovie = await Movie.create(req.body);
      return res.status(201).json({ success: true, data: newMovie });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  },

  // Edit an existing movie
  editMovie: async (req, res) => {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedMovie) {
        return res.status(404).json({ success: false, message: 'Movie not found.' });
      }
      return res.status(200).json({ success: true, data: updatedMovie });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  },

  // Delete a movie
  deleteMovie: async (req, res) => {
    try {
      const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
      if (!deletedMovie) {
        return res.status(404).json({ success: false, message: 'Movie not found.' });
      }
      return res.status(200).json({ success: true, data: deletedMovie });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  },
};

module.exports = manageMoviesController;
