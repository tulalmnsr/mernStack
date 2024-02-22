const Ticket = require('../models/ticketsmodel');

const TicketsController = {
  // List all tickets
  listTickets: async (req, res) => {
    try {
      // Fetch all tickets from the database
      const tickets = await Ticket.find();

      // Respond with the retrieved data
      return res.status(200).json({ success: true, data: tickets });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  },

  // Get details of a specific ticket
  getTicketDetails: async (req, res) => {
    try {
      // Extract ticket ID from the request parameters
      const { id } = req.params;

      // Fetch the ticket from the database based on the ID
      const ticket = await Ticket.findById(id);

      // Check if the ticket exists
      if (!ticket) {
        return res.status(404).json({ success: false, message: 'Ticket not found.' });
      }

      // Respond with the retrieved data
      return res.status(200).json({ success: true, data: ticket });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  },

  // Edit details of a specific ticket
  editTicket: async (req, res) => {
    try {
      // Extract ticket ID from the request parameters
      const { id } = req.params;

      // Extract updated information from the request body
      const { status } = req.body;

      // Check if the required fields are provided
      if (!status) {
        return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
      }

      // Update the ticket status in the database
      const updatedTicket = await Ticket.findByIdAndUpdate(id, { status }, { new: true });

      // Respond with the updated data
      return res.status(200).json({ success: true, data: updatedTicket });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  },

  // Delete a specific ticket
  deleteTicket: async (req, res) => {
    try {
      // Extract ticket ID from the request parameters
      const { id } = req.params;

      // Remove the ticket from the database based on the ID
      await Ticket.findByIdAndDelete(id);

      // Respond with success message
      return res.status(200).json({ success: true, message: 'Ticket deleted successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  },

  // Get tickets sold per movie
  getTotalTickets: async (req, res) => {
    try {
      // Count the total number of tickets in the database
      const totalTickets = await Ticket.countDocuments();

      // Respond with the total number of tickets
      return res.status(200).json({ success: true, totalTickets });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  },

  // Get tickets sold per movie
  getTicketsPerMovie: async (req, res) => {
    try {
      // Perform aggregation to get tickets sold per movie
      const ticketsPerMovie = await Ticket.aggregate([
        {
          $group: {
            _id: "$movieId",
            ticketsSold: { $sum: 1 } // Count the tickets for each movie
          }
        },
        {
          $lookup: {
            from: "movies", // Assuming the collection name for movies is "movies"
            localField: "_id",
            foreignField: "_id",
            as: "movie"
          }
        },
        {
          $unwind: "$movie"
        },
        {
          $project: {
            _id: 0,
            movieName: "$movie.name",
            ticketsSold: 1
          }
        }
      ]);

      // Respond with the aggregated data
      return res.status(200).json({ success: true, data: ticketsPerMovie });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  }
};

module.exports = TicketsController;
