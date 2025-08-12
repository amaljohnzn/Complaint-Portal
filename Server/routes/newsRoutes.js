const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const {
  createNews,
  getNews,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");
const newsUpload = require("../middleware/uploadNewsImage"); // renamed import

const router = express.Router();

router.get("/", getNews); // Public - fetch news
router.post("/", protect, isAdmin, newsUpload.single("image"), createNews); // Admin only
router.put("/:id", protect, isAdmin, newsUpload.single("image"), updateNews);
router.delete("/:id", protect, isAdmin, deleteNews);

module.exports = router;
