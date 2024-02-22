const Ticket = require('../models/ticketsmodel');
const nodemailer = require('nodemailer');

// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    // Assuming you have user and movie information in the request body
    const { userId, movieId, showtime, seats, paymentMethod, amount, guestInfo } = req.body;

    // Create a new ticket
    const newTicket = new Ticket({
      userId,
      movieId,
      showtime,
      seats,
      status: 'Booked', // Set initial status to booked
      payment: {
        method: paymentMethod,
        amount,
      },
      guestInfo,
    });

    // Save the ticket to the database
    await newTicket.save();

    // Send the ticket to the user's email
    await sendTicketByEmail(newTicket, guestInfo.email);

    res.status(201).json({ success: true, message: 'Ticket created successfully' });
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Function to send the ticket by email
const sendTicketByEmail = async (ticket, userEmail) => {
  try {
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Use environment variables
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Your Movie Ticket',
      html: `<p>Thank you for booking your ticket!</p><p>Details: ${JSON.stringify(ticket)}</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Ticket sent successfully to:', userEmail);
  } catch (error) {
    console.error('Error sending email:', error);
    // Handle email sending error, you can log it or throw an exception
  }
};
