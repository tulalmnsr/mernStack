// Import necessary dependencies
const About = require('../models/aboutModel');

const aboutController = {
  // Get information about your application
  getAboutInfo: async (req, res) => {
    try {
      // Fetch data from the database
      const aboutInfo = await About.findOne();

      // Check if there is any data
      if (!aboutInfo) {
        return res.status(404).json({ success: false, message: 'About information not found.' });
      }

      // Respond with the retrieved data
      return res.status(200).json({ success: true, data: aboutInfo });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  },

  // Update information about your application
  updateAboutInfo: async (req, res) => {
    try {
      // Extract updated information from the request body
      const { title, description, contact } = req.body;

      // Check if the required fields are provided
      if (!title || !description || !contact) {
        return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
      }

      // Update the about information in the database
      const updatedAbout = await About.findOneAndUpdate(
        {},
        { title, description, contact },
        { new: true, upsert: true }
      );

      // Respond with the updated data
      return res.status(200).json({ success: true, data: updatedAbout });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  },
};

module.exports = aboutController;
