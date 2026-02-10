// backend/utils/batchUpload.js
import uploadToCloudinary from "./uploadToCloudinary.js";

/**
 * Upload multiple images to Cloudinary in batches
 * @param {Array} files - Array of multer file objects
 * @param {Number} batchSize - Number of concurrent uploads (default: 10)
 * @returns {Promise<Array>} - Array of upload results
 */
export const uploadInBatches = async (files, batchSize = 10) => {
  const results = [];
  const errors = [];

  // Process in batches to avoid overwhelming Cloudinary
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    
    console.log(`📤 Uploading batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(files.length / batchSize)}`);
    console.log(`   Files: ${i + 1}-${Math.min(i + batchSize, files.length)} of ${files.length}`);

    const batchPromises = batch.map(async (file) => {
      try {
        const result = await uploadToCloudinary(file);
        return {
          success: true,
          originalName: file.originalname,
          url: result.url,
          publicId: result.publicId,
          cardUrl: result.cardUrl,
          thumbUrl: result.thumbUrl,
        };
      } catch (error) {
        console.error(`❌ Failed to upload ${file.originalname}:`, error.message);
        return {
          success: false,
          originalName: file.originalname,
          error: error.message,
        };
      }
    });

    const batchResults = await Promise.all(batchPromises);
    
    // Separate successes and failures
    batchResults.forEach((result) => {
      if (result.success) {
        results.push(result);
        console.log(`   ✅ ${result.originalName}`);
      } else {
        errors.push(result);
        console.log(`   ❌ ${result.originalName}: ${result.error}`);
      }
    });
  }

  console.log(`\n📊 Upload Summary:`);
  console.log(`   ✅ Successful: ${results.length}`);
  console.log(`   ❌ Failed: ${errors.length}`);

  if (errors.length > 0) {
    console.log(`\n⚠️  Failed uploads:`);
    errors.forEach((err) => {
      console.log(`   - ${err.originalName}: ${err.error}`);
    });
  }

  return results;
};

/**
 * Delete an image from Cloudinary
 * @param {String} publicId - Cloudinary public ID
 */
export const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log(`🗑️  Deleted image: ${publicId}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to delete ${publicId}:`, error.message);
    return false;
  }
};