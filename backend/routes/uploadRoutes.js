// backend/routes/uploadRoutes.js
import express from "express";
import upload from "../middlewares/upload.js";
import { uploadInBatches } from "../utils/batchUpload.js";

const router = express.Router();

/**
 * POST /api/upload
 * Upload multiple images to Cloudinary
 * Max 150 images per request
 */
router.post("/", upload.array("images", 150), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images received. Use form-data key 'images'.",
      });
    }

    console.log(`\n📸 Received ${req.files.length} images for upload`);

    // Upload in batches of 10
    const uploadedImages = await uploadInBatches(req.files, 10);

    // Return success response
    res.status(200).json({
      success: true,
      message: `Successfully uploaded ${uploadedImages.length} images`,
      count: uploadedImages.length,
      images: uploadedImages.map(img => ({
        originalName: img.originalName,
        url: img.url, // Full Cloudinary URL
        publicId: img.publicId,
        cardUrl: img.cardUrl, // Optimized for cards
        thumbUrl: img.thumbUrl, // Thumbnail
      })),
    });

  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to upload images",
    });
  }
});

/**
 * GET /api/upload/test
 * Test endpoint to verify Cloudinary configuration
 */
router.get("/test", async (req, res) => {
  try {
    const cloudinary = (await import("../config/cloudinary.js")).default;
    
    // Test API connection
    const result = await cloudinary.api.ping();
    
    res.json({
      success: true,
      message: "Cloudinary connection successful",
      status: result.status,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cloudinary connection failed",
      error: error.message,
    });
  }
});

export default router;