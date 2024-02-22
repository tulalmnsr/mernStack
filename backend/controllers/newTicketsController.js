// Import necessary dependencies
const Ticket = require('../models/ticketsmodel');

const newTicketsController = {
  // List all new ticket requests
  listNewTickets: async (req, res) => {
    try {
      // Fetch all new ticket requests from the database (you may need to define criteria for "new" tickets)
      const newTickets = await Ticket.find({ status: 'new' });

      // Respond with the retrieved data
      return res.status(200).json({ success: true, data: newTickets });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  },

  // Approve a new ticket
  approveNewTicket: async (req, res) => {
    try {
      // Extract ticket ID from the request parameters
      const { id } = req.params;

      // Update the ticket status to "approved" in the database
      const approvedTicket = await Ticket.findByIdAndUpdate(id, { status: 'approved' }, { new: true });

      // Check if the ticket exists
      if (!approvedTicket) {
        return res.status(404).json({ success: false, message: 'Ticket not found.' });
      }

      // Respond with the updated data
      return res.status(200).json({ success: true, data: approvedTicket });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  },
};

module.exports = newTicketsController;
