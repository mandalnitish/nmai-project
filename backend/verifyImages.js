import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Import Article model
let Article;
try {
  Article = (await import("./models/Article.js")).default;
} catch (err) {
  console.error("❌ Failed to import Article model");
  process.exit(1);
}

const verifyImages = async () => {
  try {
    console.log("\n🔍 VERIFYING IMAGE URLS\n");
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    // Get latest articles
    const articles = await Article.find({})
      .sort({ publishDate: -1 })
      .limit(10)
      .select('title featuredImage.url publishDate');

    console.log("📋 Latest 10 Articles and Their Image URLs:\n");
    console.log("=".repeat(100));

    for (const article of articles) {
      const date = article.publishDate ? 
        new Date(article.publishDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }) : 'No date';

      console.log(`\n📄 ${article.title}`);
      console.log(`   Date: ${date}`);
      
      if (article.featuredImage?.url) {
        const url = article.featuredImage.url;
        console.log(`   ✅ Image URL: ${url}`);
        
        // Validate URL format
        if (url.startsWith('https://res.cloudinary.com/')) {
          console.log(`   ☁️  Format: Valid Cloudinary URL`);
        } else if (url.startsWith('http')) {
          console.log(`   🌐 Format: Valid HTTP URL`);
        } else {
          console.log(`   ⚠️  Format: Invalid - missing protocol`);
        }
      } else {
        console.log(`   ❌ NO IMAGE URL`);
      }
    }

    console.log("\n" + "=".repeat(100));

    // Statistics
    const total = await Article.countDocuments();
    const withImages = await Article.countDocuments({
      'featuredImage.url': { $exists: true, $ne: null, $ne: "" }
    });
    const cloudinary = await Article.countDocuments({
      'featuredImage.url': { $regex: 'cloudinary.com' }
    });

    console.log("\n📊 STATISTICS");
    console.log("=".repeat(100));
    console.log(`Total articles: ${total}`);
    console.log(`With images: ${withImages} (${Math.round(withImages/total*100)}%)`);
    console.log(`Cloudinary images: ${cloudinary} (${Math.round(cloudinary/total*100)}%)`);
    console.log(`Missing images: ${total - withImages}`);

    console.log("\n💡 HOW TO USE THESE URLS IN FRONTEND:\n");
    console.log("In your ArticleImage component, use the URL directly:");
    console.log("```javascript");
    console.log("const imageUrl = imageName; // imageName IS the full URL!");
    console.log("<img src={imageUrl} alt={title} />");
    console.log("```");

    console.log("\n🔧 DEBUGGING TIP:\n");
    console.log("Add console.log in your ArticleImage component:");
    console.log("```javascript");
    console.log("console.log('🖼️  Received imageName:', imageName);");
    console.log("```");
    console.log("This will show you what URL the component is receiving.\n");

    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
};

verifyImages();