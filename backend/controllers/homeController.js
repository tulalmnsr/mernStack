const Movie = require('../models/homeModel');


const homeController = {
  displayMovies: async (req, res) => {
    try {
      // Fetch the list of movies from the database
      const movies = await Movie.find();

      console.log('Fetched movies:', movies);

      // Render the home page with the list of movies
      res.render('home', { movies });
    } catch (error) {
      console.error('Error fetching movies:', error);
      // Handle errors and render an error page
      res.render('error', { error: 'Error fetching movies' });
    }
  },
};


module.exports = homeController;
