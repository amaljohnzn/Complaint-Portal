const News = require("../models/News");

// 📌 Create News
const createNews = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Cloudinary URL

    const news = new News({
      title,
      content,
      imageUrl,
      createdBy: req.user.id, // from auth middleware
    });

    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ message: "Failed to create news", error: err.message });
  }
};

// 📌 Get All News
const getNews = async (req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 });
    res.json(newsList);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch news", error: err.message });
  }
};

// 📌 Update News
const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    let updateData = { title, content };

    if (req.file) {
      updateData.imageUrl = req.file.path; // New Cloudinary URL
    }

    const updatedNews = await News.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedNews) return res.status(404).json({ message: "News not found" });

    res.json(updatedNews);
  } catch (err) {
    res.status(500).json({ message: "Failed to update news", error: err.message });
  }
};

// 📌 Delete News
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findById(id);
    if (!news) return res.status(404).json({ message: "News not found" });

    // Optional: Delete image from Cloudinary if needed
    // if (news.imageUrl) {
    //   const publicId = news.imageUrl.split("/").pop().split(".")[0];
    //   await cloudinary.uploader.destroy(`news/${publicId}`);
    // }

    await news.deleteOne();
    res.json({ message: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete news", error: err.message });
  }
};

module.exports = {
  createNews,
  getNews,
  updateNews,
  deleteNews
};
