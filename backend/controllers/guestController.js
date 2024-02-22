const Guest = require('../models/guestmodel');

const guestController = {
  createGuestBooking: async (req, res) => {
    const { name, email, movieId, showtime, seats, status, payment } = req.body;
    try {
      const newGuest = new Guest({ name, email, booking: [{ movieId, showtime, seats, status, payment }] });
      await newGuest.save();
      res.json({ success: true, message: 'Guest booking created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getGuestBookingDetails: async (req, res) => {
    const { guestId } = req.params;
    try {
      const guest = await Guest.findById(guestId);
      if (!guest) {
        return res.status(404).json({ success: false, message: 'Guest booking not found' });
      }
      res.json({ success: true, data: guest });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  updateGuestBooking: async (req, res) => {
    const { guestId } = req.params;
    const { movieId, showtime, seats, status, payment } = req.body;
    try {
      const guest = await Guest.findByIdAndUpdate(guestId, {
        $push: { booking: { movieId, showtime, seats, status, payment } },
      });
      if (!guest) {
        return res.status(404).json({ success: false, message: 'Guest booking not found' });
      }
      res.json({ success: true, message: 'Guest booking updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
};

module.exports = guestController;
