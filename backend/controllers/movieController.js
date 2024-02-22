const Movie = require('../models/moviemodel');

const movieController = {
  getAllMovies: async (req, res) => {
    try {
      const movies = await Movie.find();
      const genres = [...new Set(movies.map(movie => movie.genre))];
      res.json({ success: true, data: { movies, genres } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getMovieDetails: async (req, res) => {
    const { movieId } = req.params;
    try {
      const movie = await Movie.findById(movieId);
      if (!movie) {
        return res.status(404).json({ success: false, message: 'Movie not found' });
      }
      res.json({ success: true, data: movie });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  addMovie: async (req, res) => {
    const { title, overview, releaseDate, genre, trailerUrl, showtimes } = req.body;
    try {
      const newMovie = new Movie({
        title,
        overview,
        releaseDate,
        genre,
        trailerUrl,
        showtimes,
      });
      await newMovie.save();
      res.json({ success: true, message: 'Movie added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  updateMovie: async (req, res) => {
    const { movieId } = req.params;
    const { title, overview, releaseDate, genre, trailerUrl, showtimes } = req.body;
    try {
      const movie = await Movie.findByIdAndUpdate(
        movieId,
        { title, overview, releaseDate, genre, trailerUrl, showtimes },
        { new: true }
      );
      if (!movie) {
        return res.status(404).json({ success: false, message: 'Movie not found' });
      }
      res.json({ success: true, message: 'Movie updated successfully', data: movie });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  deleteMovie: async (req, res) => {
    const { movieId } = req.params;
    try {
      const movie = await Movie.findByIdAndDelete(movieId);
      if (!movie) {
        return res.status(404).json({ success: false, message: 'Movie not found' });
      }
      res.json({ success: true, message: 'Movie deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
};

module.exports = movieController;
