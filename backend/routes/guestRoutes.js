const express = require('express');
const router = express.Router();

const guestController = require('../controllers/guestController');

// Create a new guest booking
router.post('/guests', guestController.createGuestBooking);

// Get details of a guest booking
router.get('/guests/:guestId', guestController.getGuestBookingDetails);

// Update a guest booking
router.put('/guests/:guestId', guestController.updateGuestBooking);

module.exports = router;
