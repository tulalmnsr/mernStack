const Event = require('../models/eventmodel');

const eventController = {
  createEvent: async (req, res) => {
    const { title, description, date } = req.body;
    try {
      const newEvent = new Event({ title, description, date });
      await newEvent.save();
      res.json({ success: true, message: 'Event created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getEventDetails: async (req, res) => {
    const { eventId } = req.params;
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }
      res.json({ success: true, data: event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  deleteEvent: async (req, res) => {
    const { eventId } = req.params;
    try {
      const event = await Event.findByIdAndDelete(eventId);
      if (!event) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }
      res.json({ success: true, message: 'Event deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
};

module.exports = eventController;
