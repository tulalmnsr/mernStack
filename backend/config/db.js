// db.js

const mongoose = require('mongoose');

// Replace 'your_database_uri' with your actual MongoDB connection string
const dbURI =  process.env.DB_URI ||'mongodb+srv://zeina:UZQUWdCvK3uPfx7O@movie.bacfcil.mongodb.net/';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Connection events
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Graceful shutdown
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

// Export the Mongoose instance
module.exports = mongoose;
