// emailController.js
 
const { sendEmail } = require('../services/mailService');
const Email = require('../models/emailmodel');
const User = require('../models/usermodel');

const emailController = {
  sendEmail: async (req, res) => {
    const { userId, emailType, subject, content } = req.body;

    try {
      const newEmail = new Email({ userId, emailType, subject, content });
      await newEmail.save();
      const user = await User.findById(userId);

      // Sending email
      await sendEmail(user.email, subject, content);

      res.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error in emailController:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getEmailDetails: async (req, res) => {
    const { emailId } = req.params;
    
    try {
      const email = await Email.findById(emailId).populate('userId');
      if (!email) {
        return res.status(404).json({ success: false, message: 'Email not found' });
      }
      res.json({ success: true, data: email });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  deleteEmail: async (req, res) => {
    const { emailId } = req.params;

    try {
      const email = await Email.findByIdAndDelete(emailId);
      if (!email) {
        return res.status(404).json({ success: false, message: 'Email not found' });
      }
      res.json({ success: true, message: 'Email deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getAllEmails: async (req, res) => {
    try {
      const emails = await Email.find().populate('userId');
      res.json({ success: true, data: emails });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
};

module.exports = emailController;
