// backend/scripts/migrateImagesToCloudinary.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import Article model - adjust path if needed
let Article;
try {
  Article = (await import("../models/Article.js")).default;
} catch (err) {
  console.error("❌ Failed to import Article model");
  console.error("   Make sure the path is correct: ../models/Article.js");
  console.error("   Error:", err.message);
  process.exit(1);
}

/**
 * Update articles to use proper Cloudinary URLs
 */
const migrateImageUrls = async () => {
  console.log("\n🔄 Starting Image URL Migration...\n");
  
  try {
    // Check environment variables
    if (!process.env.MONGODB_URI) {
      console.error("❌ MONGODB_URI not found in environment variables");
      console.error("   Make sure .env file exists and contains MONGODB_URI");
      process.exit(1);
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      console.error("❌ CLOUDINARY_CLOUD_NAME not found in environment variables");
      console.error("   Make sure .env file contains CLOUDINARY_CLOUD_NAME");
      process.exit(1);
    }

    console.log("🔗 Connecting to MongoDB...");
    console.log(`   URI: ${process.env.MONGODB_URI.substring(0, 30)}...`);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected\n");

    // Get all articles
    console.log("📊 Fetching articles...");
    const articles = await Article.find({});
    console.log(`   Found ${articles.length} articles\n`);

    if (articles.length === 0) {
      console.log("⚠️  No articles found in database");
      console.log("   Make sure you have articles in your database");
      process.exit(0);
    }

    let updatedCount = 0;
    let skippedCount = 0;
    let alreadyCloudinary = 0;
    let noImageCount = 0;

    console.log("🔄 Processing articles...\n");
    console.log("=".repeat(80));

    for (const article of articles) {
      try {
        const imageUrl = article.featuredImage?.url;
        
        // Skip if no image
        if (!imageUrl) {
          console.log(`⏭️  No image: ${article.title.substring(0, 60)}`);
          noImageCount++;
          continue;
        }

        // Skip if already a Cloudinary URL
        if (imageUrl.includes('cloudinary.com') || imageUrl.includes('res.cloudinary')) {
          console.log(`✅ Already Cloudinary: ${article.title.substring(0, 50)}`);
          alreadyCloudinary++;
          continue;
        }

        // Extract filename from URL
        let filename = imageUrl;
        
        // Handle different URL formats
        if (imageUrl.includes('/uploads/')) {
          filename = imageUrl.split('/uploads/').pop();
        } else if (imageUrl.includes('/')) {
          filename = imageUrl.split('/').pop();
        }

        // Remove query strings if any
        filename = filename.split('?')[0];

        // Construct new Cloudinary URL
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const newUrl = `https://res.cloudinary.com/${cloudName}/image/upload/nmai-articles/${filename}`;

        // Update article
        await Article.updateOne(
          { _id: article._id },
          {
            $set: {
              'featuredImage.url': newUrl,
              'featuredImage.cloudinaryId': `nmai-articles/${filename}`,
            }
          }
        );

        console.log(`🔄 Updated: ${article.title.substring(0, 50)}`);
        console.log(`   Old: ${imageUrl.substring(0, 70)}...`);
        console.log(`   New: ${newUrl.substring(0, 70)}...`);
        console.log("");
        updatedCount++;

      } catch (error) {
        console.error(`❌ Error updating ${article.title}:`, error.message);
        skippedCount++;
      }
    }

    console.log("=".repeat(80));
    console.log("\n📊 MIGRATION SUMMARY");
    console.log("=".repeat(80));
    console.log(`✅ Updated articles: ${updatedCount}`);
    console.log(`✔️  Already Cloudinary: ${alreadyCloudinary}`);
    console.log(`⏭️  No image: ${noImageCount}`);
    console.log(`❌ Errors: ${skippedCount}`);
    console.log(`📈 Total processed: ${articles.length}`);

    // Show sample of updated articles
    if (updatedCount > 0) {
      console.log("\n📋 Sample updated articles:");
      const sampleUpdated = await Article.find({
        'featuredImage.url': { $regex: 'cloudinary.com' }
      }).limit(5).select('title featuredImage.url');

      sampleUpdated.forEach((article, idx) => {
        console.log(`\n${idx + 1}. ${article.title}`);
        console.log(`   ${article.featuredImage.url.substring(0, 80)}...`);
      });
    }

    console.log("\n✅ Migration completed successfully!");
    console.log("\n💡 Next steps:");
    console.log("   1. Restart your backend server");
    console.log("   2. Clear browser cache (Ctrl + Shift + Delete)");
    console.log("   3. Refresh your website");
    console.log("   4. Check browser console for any image errors\n");

    await mongoose.connection.close();
    process.exit(0);
    
  } catch (error) {
    console.error("\n❌ Migration failed:", error.message);
    console.error("\nStack trace:");
    console.error(error.stack);
    
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    
    process.exit(1);
  }
};

// Run the migration
migrateImageUrls();