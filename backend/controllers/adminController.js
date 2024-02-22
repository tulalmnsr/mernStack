// Import necessary dependencies
const bcrypt = require('bcrypt');
const Admin = require('../models/adminmodel');

const adminLoginController = {
  // Admin login logic
  adminLogin: async (req, res) => {
    try {
      // Extract credentials from the request body
      const { email, password } = req.body;

      // Check if the required fields are provided
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide email and password.' });
      }

      // Find the admin by email
      const admin = await Admin.findOne({ email });

      // Check if the admin exists
      if (!admin) {
        return res.status(404).json({ success: false, message: 'Admin not found.' });
      }

      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, admin.password);

      // Check if passwords match
      if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Invalid password.' });
      }

      // Passwords match, respond with success message or token if using JWT

      return res.status(200).json({ success: true, message: 'Admin login successful.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  },
};

module.exports = adminLoginController;

