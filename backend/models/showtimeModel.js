// models/Showtime.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const showtimeSchema = new Schema({
  cinema_name: { type: String, required: true },
  movie_name: { type: String, required: true },
  showtime_date: { type: Date, required: true },
  movie_start_time: { type: String, required: true },
  show_type: { type: String, required: true },
  genre: [{ type: String, required: true }],
  image_path: { type: String, required: true },
  shown_in: { type: Boolean, default: false }
});

const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = Showtime;