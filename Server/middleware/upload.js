// middleware/upload.js
require("dotenv").config();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("Cloudinary ENV:", {
  name: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY ? "Loaded" : "Missing",
  secret: process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing"
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "complaints",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    resource_type: "image",
    public_id: (req, file) => Date.now() + "-" + file.originalname.split(".")[0]
  },
});

const upload = multer({ storage });

module.exports = upload;
