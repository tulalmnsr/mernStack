// emailRoutes.js
const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/send-email', emailController.sendEmail);
router.get('/emails/:emailId', emailController.getEmailDetails);
router.delete('/emails/:emailId', emailController.deleteEmail);
router.get('/emails', emailController.getAllEmails);

module.exports = router;
