const User = require('../models/usermodel');
const Booking = require('../models/bookingmodel');

const adminPanelController = {
  // Get information about new users
  getNewUsers: async () => {
    try {
      // Fetch new users (you may define 'new' based on your criteria)
      const newUsers = await User.find({}).limit(10).sort({ createdAt: -1 });

      return { success: true, data: newUsers };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error fetching new users.' };
    }
  },

  // Get information about new bookings
  getNewBookings: async () => {
    try {
      // Fetch new bookings (you may define 'new' based on your criteria)
      const newBookings = await Booking.find({}).limit(10).sort({ createdAt: -1 });

      return { success: true, data: newBookings };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error fetching new bookings.' };
    }
  },

  // Get information about booking cancellations
  getCanceledBookings: async () => {
    try {
      // Fetch canceled bookings
      const canceledBookings = await Booking.find({ status: 'canceled' }).limit(10).sort({ createdAt: -1 });

      return { success: true, data: canceledBookings };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error fetching canceled bookings.' };
    }
  },

  // ... (other adminPanelController methods)
};

module.exports = adminPanelController;
