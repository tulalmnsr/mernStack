const Booking = require('../models/bookingmodel');

const bookingController = {
  getAllBookings: async (req, res) => {
    try {
      const bookings = await Booking.find();
      res.json({ success: true, data: bookings });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getBookingDetails: async (req, res) => {
    const { bookingId } = req.params;
    try {
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }
      res.json({ success: true, data: booking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  addBooking: async (req, res) => {
    const { userId, movieId, showtime, seats, status, payment } = req.body;
    try {
      const newBooking = new Booking({
        userId,
        movieId,
        showtime,
        seats,
        status,
        payment,
      });
      await newBooking.save();
      res.json({ success: true, message: 'Booking added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  updateBooking: async (req, res) => {
    const { bookingId } = req.params;
    const { userId, movieId, showtime, seats, status, payment } = req.body;
    try {
      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        { userId, movieId, showtime, seats, status, payment },
        { new: true }
      );
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }
      res.json({ success: true, message: 'Booking updated successfully', data: booking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  deleteBooking: async (req, res) => {
    const { bookingId } = req.params;
    try {
      const booking = await Booking.findByIdAndDelete(bookingId);
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }
      res.json({ success: true, message: 'Booking deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
};

module.exports = bookingController;
