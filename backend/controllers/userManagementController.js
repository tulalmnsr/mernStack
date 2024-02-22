// Import necessary dependencies
const User = require('../models/usermodel');

const userManagementController = {
  // List all users
  listUsers: async (req, res) => {
    try {
      // Fetch all users from the database
      const users = await User.find();

      // Respond with the retrieved data
      return res.status(200).json({ success: true, data: users });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  },
};

module.exports = userManagementController;
