// backend/utils/uploadToCloudinary.js
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

/**
 * Upload a single file to Cloudinary
 * @param {Object} file - Multer file object
 * @returns {Promise<Object>} - Cloudinary response with secure_url
 */
const uploadToCloudinary = async (file) => {
  try {
    // Upload to Cloudinary with optimizations
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "nmai-articles", // Organize in folder
      resource_type: "auto",
      transformation: [
        { width: 1200, height: 675, crop: "limit" }, // Max size
        { quality: "auto:good" }, // Auto optimize quality
        { fetch_format: "auto" }, // Serve WebP to supporting browsers
      ],
      // Generate multiple sizes immediately
      eager: [
        { width: 400, height: 250, crop: "fill", gravity: "auto" }, // Card size
        { width: 150, height: 150, crop: "fill", gravity: "auto" }, // Thumbnail
      ],
      eager_async: false, // Wait for eager transformations
    });

    // Delete local file after upload
    fs.unlinkSync(file.path);

    return {
      url: result.secure_url, // Full size URL
      publicId: result.public_id,
      eager: result.eager, // Array of transformed versions
      cardUrl: result.eager[0]?.secure_url, // Card size
      thumbUrl: result.eager[1]?.secure_url, // Thumbnail
      format: result.format,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    // Clean up file on error
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    console.error("Cloudinary upload error:", error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

export default uploadToCloudinary;