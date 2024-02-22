const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const guestRoutes = require('./routes/guestRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authenticate = require('./middleware/authenticate');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const emailRoutes = require('./routes/emailRoutes');
const routes = require('./routes/routes');
const Movie = require('./models/homeModel');
const homeController = require('./controllers/homeController');


// Connect to MongoDB (update the connection string)
const mongooseOptions = {};

mongoose.connect(process.env.MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use(logger);

// Apply authentication middleware only to routes that need it
app.use('/api', authenticate);

app.use(express.json());

// Use user routes
app.use('/', routes);
app.use('/users', userRoutes);
app.use('/api', guestRoutes);
app.use('/api/payments', paymentRoutes);

app.use('/api/emails', emailRoutes);
app.use('/api', routes);
app.set('view engine', 'ejs');

app.get('/', homeController.displayMovies);

app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
