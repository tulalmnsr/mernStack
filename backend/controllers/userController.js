const bcrypt = require('bcrypt');
const User = require('../models/usermodel');
const SessionController = require('./sessionController');

const userController = {
  register: async (req, res) => {
    try {
      const { username, email, password, profile } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, error: 'Email is already registered.' });
      }

      const newUser = new User({
        username,
        email,
        password,
        profile: {
          name: profile.name,
          photo: profile.photo || null,
        }
      });

      await newUser.save();

      const token = SessionController.createSession(newUser._id);
      res.json({ success: true, message: 'Registration successful.', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Registration failed.' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const token = SessionController.createSession(user._id);
      res.json({ message: 'Login successful.', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Login failed.' });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const { newProfile } = req.body;
      await User.findByIdAndUpdate(req.user.id, { profile: newProfile });
      res.json({ message: 'Profile updated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Profile update failed.' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user.id);
      res.json({ message: 'User deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'User deletion failed.' });
    }
  },

  // Get total customers
  getTotalCustomers: async (req, res) => {
    try {
      // Count the total number of customers in the database
      const totalCustomers = await User.countDocuments();

      // Respond with the total number of customers
      return res.status(200).json({ success: true, totalCustomers });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Internal server error.' });
    }
  }
};

module.exports = userController;
