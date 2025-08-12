const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v2: cloudinary } = require("cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "news", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: () => Date.now().toString(), // Unique file name
  },
});

const newsUpload = multer({ storage });

module.exports = newsUpload;
