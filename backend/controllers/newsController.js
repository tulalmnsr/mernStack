const News = require('../models/newsAndUpdatesmodel');

const newsController = {
  createNews: async (req, res) => {
    const { title, content, publishedAt } = req.body;
    try {
      const newNews = new News({ title, content, publishedAt });
      await newNews.save();
      res.json({ success: true, message: 'News article created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getNewsDetails: async (req, res) => {
    const { newsId } = req.params;
    try {
      const news = await News.findById(newsId);
      if (!news) {
        return res.status(404).json({ success: false, message: 'News article not found' });
      }
      res.json({ success: true, data: news });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  updateNews: async (req, res) => {
    const { newsId } = req.params;
    const { title, content, publishedAt } = req.body;
    try {
      const news = await News.findByIdAndUpdate(newsId, { title, content, publishedAt });
      if (!news) {
        return res.status(404).json({ success: false, message: 'News article not found' });
      }
      res.json({ success: true, message: 'News article updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  deleteNews: async (req, res) => {
    const { newsId } = req.params;
    try {
      const news = await News.findByIdAndDelete(newsId);
      if (!news) {
        return res.status(404).json({ success: false, message: 'News article not found' });
      }
      res.json({ success: true, message: 'News article deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
};

module.exports = newsController;
