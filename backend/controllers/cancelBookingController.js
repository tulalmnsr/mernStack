// Import necessary models and modules
const Booking = require('../models/bookingmodel');
const moment = require('moment');

const cancelBookingController = {
  // Cancel a booking before 24 hours of showtime
  cancelBooking: async (req, res) => {
    try {
      // Find the booking by ID
      const booking = await Booking.findById(req.params.id);

      // Check if the booking exists
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      // Extract showtime and current time
      const showtime = moment(booking.showtime);
      const now = moment();

      // Calculate the difference in hours between showtime and current time
      const hoursDifference = showtime.diff(now, 'hours');

      // Check if cancellation is allowed
      if (hoursDifference <= 24 && hoursDifference >= 0) {
        // Update the booking status to 'cancelled'
        booking.status = 'cancelled';

        // Save the updated booking
        await booking.save();

        return res.json({ message: 'Booking cancelled successfully' });
      }

      // Handle scenarios where cancellation is not allowed
      if (hoursDifference < 0) {
        return res.status(400).json({ error: 'The showtime has already passed. Cancellation is not allowed.' });
      }

      // Handle scenarios where cancellation is not allowed before 24 hours
      return res.status(400).json({ error: 'Cancellation is allowed only before 24 hours of the showtime' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = cancelBookingController;
