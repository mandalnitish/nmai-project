// backend/scripts/checkImageUrls.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let Article;
try {
  Article = (await import("../models/Article.js")).default;
} catch (err) {
  console.error("❌ Failed to import Article model");
  console.error("   Error:", err.message);
  process.exit(1);
}

const checkImageUrls = async () => {
  console.log("\n🔍 Checking Image URLs...\n");
  
  try {
    // Connect to MongoDB
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected\n");

    // Get article count
    const totalCount = await Article.countDocuments();
    console.log(`📊 Total articles in database: ${totalCount}\n`);

    if (totalCount === 0) {
      console.log("⚠️  No articles found");
      process.exit(0);
    }

    // Count articles by image type
    const withImages = await Article.countDocuments({
      'featuredImage.url': { $exists: true, $ne: null, $ne: "" }
    });

    const withoutImages = totalCount - withImages;

    const cloudinaryImages = await Article.countDocuments({
      'featuredImage.url': { $regex: 'cloudinary', $options: 'i' }
    });

    const localImages = await Article.countDocuments({
      'featuredImage.url': { $exists: true, $ne: null, $ne: "" },
      'featuredImage.url': { $not: { $regex: 'cloudinary', $options: 'i' } }
    });

    console.log("=".repeat(80));
    console.log("📊 IMAGE URL ANALYSIS");
    console.log("=".repeat(80));
    console.log(`Total articles: ${totalCount}`);
    console.log(`Articles with images: ${withImages}`);
    console.log(`Articles without images: ${withoutImages}`);
    console.log(`Cloudinary URLs: ${cloudinaryImages}`);
    console.log(`Local/Other URLs: ${localImages}`);
    console.log("=".repeat(80));

    // Show sample articles with images
    console.log("\n📋 Sample articles with images:\n");
    const samples = await Article.find({
      'featuredImage.url': { $exists: true, $ne: null, $ne: "" }
    }).limit(10).select('title featuredImage.url publishDate');

    samples.forEach((article, idx) => {
      const date = article.publishDate ? 
        new Date(article.publishDate).toLocaleDateString() : 
        'No date';
      
      console.log(`${idx + 1}. ${article.title.substring(0, 60)}`);
      console.log(`   Date: ${date}`);
      console.log(`   URL: ${article.featuredImage.url}`);
      
      // Determine URL type
      if (article.featuredImage.url.includes('cloudinary')) {
        console.log(`   Type: ✅ Cloudinary`);
      } else if (article.featuredImage.url.startsWith('http')) {
        console.log(`   Type: 🌐 External URL`);
      } else {
        console.log(`   Type: 📁 Local/Relative URL (NEEDS MIGRATION)`);
      }
      console.log("");
    });

    // Show articles without images
    const noImages = await Article.find({
      $or: [
        { 'featuredImage.url': { $exists: false } },
        { 'featuredImage.url': null },
        { 'featuredImage.url': "" }
      ]
    }).limit(5).select('title publishDate');

    if (noImages.length > 0) {
      console.log("📋 Sample articles WITHOUT images:\n");
      noImages.forEach((article, idx) => {
        const date = article.publishDate ? 
          new Date(article.publishDate).toLocaleDateString() : 
          'No date';
        console.log(`${idx + 1}. ${article.title.substring(0, 60)}`);
        console.log(`   Date: ${date}\n`);
      });
    }

    // Check environment variables
    console.log("\n⚙️  Environment Variables:");
    console.log("=".repeat(80));
    console.log(`MONGODB_URI: ${process.env.MONGODB_URI ? '✅ Set' : '❌ Missing'}`);
    console.log(`CLOUDINARY_CLOUD_NAME: ${process.env.CLOUDINARY_CLOUD_NAME || '❌ Missing'}`);
    console.log(`CLOUDINARY_API_KEY: ${process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing'}`);
    console.log(`CLOUDINARY_API_SECRET: ${process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing'}`);
    console.log("=".repeat(80));

    // Recommendations
    console.log("\n💡 Recommendations:\n");
    
    if (localImages > 0) {
      console.log(`⚠️  ${localImages} articles have local/non-Cloudinary URLs`);
      console.log(`   Action: Run migration script to update these URLs`);
      console.log(`   Command: node scripts/migrateImagesToCloudinary.js\n`);
    }

    if (cloudinaryImages > 0) {
      console.log(`✅ ${cloudinaryImages} articles already use Cloudinary`);
      console.log(`   No action needed for these\n`);
    }

    if (withoutImages > 0) {
      console.log(`📸 ${withoutImages} articles have no images`);
      console.log(`   Action: Add images to these articles\n`);
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      console.log(`❌ Cloudinary credentials missing`);
      console.log(`   Action: Add to .env file:`);
      console.log(`   CLOUDINARY_CLOUD_NAME=your_cloud_name`);
      console.log(`   CLOUDINARY_API_KEY=your_api_key`);
      console.log(`   CLOUDINARY_API_SECRET=your_api_secret\n`);
    }

    console.log("✅ Check completed!\n");

    await mongoose.connection.close();
    process.exit(0);
    
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.error(error.stack);
    
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    
    process.exit(1);
  }
};

checkImageUrls();