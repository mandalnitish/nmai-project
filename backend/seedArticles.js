import mongoose from "mongoose";
import allArticles from "./allArticles.js";
import Article from "./models/Article.js";
import dotenv from "dotenv";

dotenv.config();

console.log("MONGODB_URI =", process.env.MONGODB_URI);

const seedArticles = async () => {
  try {
    // Validate that allArticles is imported correctly
    if (!allArticles || allArticles.length === 0) {
      throw new Error("❌ No articles found in allArticles.js");
    }

    console.log(`📊 Found ${allArticles.length} articles to seed`);

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");

    let newArticlesCount = 0;
    let updatedArticlesCount = 0;
    let skippedArticlesCount = 0;
    let imageIssuesCount = 0;

    // Process each article
    for (const articleData of allArticles) {
      try {
        // IMPORTANT: Validate image URL
        if (!articleData.featuredImage?.url || 
            !articleData.featuredImage.url.startsWith('https://')) {
          console.warn(`⚠️  Invalid image URL for: ${articleData.title}`);
          console.warn(`   URL: ${articleData.featuredImage?.url || 'missing'}`);
          imageIssuesCount++;
        }

        // Find existing article by slug
        const existingArticle = await Article.findOne({ slug: articleData.slug });

        if (existingArticle) {
          // Check if image URL needs updating
          const imageNeedsUpdate = 
            existingArticle.featuredImage?.url !== articleData.featuredImage?.url;

          const contentNeedsUpdate = 
            existingArticle.title !== articleData.title ||
            existingArticle.content !== articleData.content ||
            existingArticle.summary !== articleData.summary ||
            imageNeedsUpdate;

          if (contentNeedsUpdate) {
            // Update content AND image URL
            await Article.updateOne(
              { slug: articleData.slug },
              {
                $set: {
                  title: articleData.title,
                  content: articleData.content,
                  summary: articleData.summary,
                  category: articleData.category,
                  examRelevance: articleData.examRelevance,
                  tags: articleData.tags,
                  featuredImage: articleData.featuredImage, // ✅ UPDATE IMAGE
                }
              }
            );
            
            if (imageNeedsUpdate) {
              console.log(`🖼️  Updated image: ${articleData.title.substring(0, 50)}`);
              console.log(`   New URL: ${articleData.featuredImage.url.substring(0, 80)}...`);
            } else {
              console.log(`📝 Updated content: ${articleData.title.substring(0, 50)}`);
            }
            updatedArticlesCount++;
          } else {
            skippedArticlesCount++;
          }
        } else {
          // New article - insert with all data
          await Article.create(articleData);
          newArticlesCount++;
          
          const dateStr = articleData.publishDate.toDateString();
          const imageUrl = articleData.featuredImage?.url || 'NO IMAGE';
          
          console.log(`✅ New article: ${articleData.title} (${dateStr})`);
          console.log(`   Image: ${imageUrl.substring(0, 80)}${imageUrl.length > 80 ? '...' : ''}`);
        }
      } catch (error) {
        console.error(`❌ Error processing article "${articleData.title}":`, error.message);
      }
    }

    console.log("\n" + "=".repeat(80));
    console.log("📊 SEEDING SUMMARY");
    console.log("=".repeat(80));
    console.log(`✨ New articles added: ${newArticlesCount}`);
    console.log(`📝 Existing articles updated: ${updatedArticlesCount}`);
    console.log(`⏭️  Articles skipped (no changes): ${skippedArticlesCount}`);
    console.log(`⚠️  Image issues detected: ${imageIssuesCount}`);
    console.log(`📈 Total articles processed: ${allArticles.length}`);

    // Verify images in database
    console.log("\n🖼️  IMAGE VERIFICATION");
    console.log("=".repeat(80));
    
    const articlesWithImages = await Article.countDocuments({
      'featuredImage.url': { $exists: true, $ne: null, $ne: "" }
    });
    
    const cloudinaryImages = await Article.countDocuments({
      'featuredImage.url': { $regex: 'cloudinary.com' }
    });

    const articlesWithoutImages = await Article.countDocuments({
      $or: [
        { 'featuredImage.url': { $exists: false } },
        { 'featuredImage.url': null },
        { 'featuredImage.url': "" }
      ]
    });

    console.log(`✅ Articles with images: ${articlesWithImages}`);
    console.log(`☁️  Cloudinary images: ${cloudinaryImages}`);
    console.log(`❌ Articles without images: ${articlesWithoutImages}`);

    // Show sample articles with images
    console.log("\n📋 Sample articles with images:");
    const sampleWithImages = await Article.find({
      'featuredImage.url': { $regex: 'cloudinary.com' }
    }).limit(5).select('title featuredImage.url publishDate');

    sampleWithImages.forEach((article, idx) => {
      const date = article.publishDate ? 
        new Date(article.publishDate).toLocaleDateString() : 
        'No date';
      console.log(`\n${idx + 1}. ${article.title.substring(0, 60)}`);
      console.log(`   Date: ${date}`);
      console.log(`   Image: ${article.featuredImage.url.substring(0, 80)}...`);
    });

    // Show articles WITHOUT images (should be none)
    if (articlesWithoutImages > 0) {
      console.log("\n⚠️  WARNING: Articles without images found!");
      const noImages = await Article.find({
        $or: [
          { 'featuredImage.url': { $exists: false } },
          { 'featuredImage.url': null },
          { 'featuredImage.url': "" }
        ]
      }).limit(5).select('title');

      noImages.forEach((article, idx) => {
        console.log(`   ${idx + 1}. ${article.title}`);
      });
    }

    // Verify latest articles
    console.log("\n📅 Latest 5 articles in database:");
    const latestArticles = await Article.find({})
      .sort({ publishDate: -1 })
      .limit(5)
      .select('title publishDate viewCount featuredImage.url');

    latestArticles.forEach((article, index) => {
      const date = article.publishDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      
      const hasImage = article.featuredImage?.url ? '🖼️' : '❌';
      const imageUrl = article.featuredImage?.url || 'NO IMAGE';
      
      console.log(`${index + 1}. ${date} - ${article.title} (${article.viewCount || 0} views) ${hasImage}`);
      console.log(`   ${imageUrl.substring(0, 80)}${imageUrl.length > 80 ? '...' : ''}`);
    });

    // Show total count by date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayCount = await Article.countDocuments({
      publishDate: { $gte: today }
    });

    console.log(`\n📆 Articles published today: ${todayCount}`);

    console.log("\n" + "=".repeat(80));
    console.log("✅ Seeding completed successfully!");
    console.log("=".repeat(80));
    console.log("\n💡 Next Steps:");
    console.log("   1. Restart your backend server");
    console.log("   2. Clear browser cache (Ctrl + Shift + R)");
    console.log("   3. Check your website");
    console.log("   4. Open browser console to check for image load errors");
    
    if (cloudinaryImages < allArticles.length) {
      console.log("\n⚠️  WARNING: Not all images are Cloudinary URLs!");
      console.log(`   Expected: ${allArticles.length}`);
      console.log(`   Got: ${cloudinaryImages}`);
      console.log("   Some images may not load correctly.");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    console.error("Error details:", error.message);
    if (error.stack) {
      console.error("Stack trace:", error.stack);
    }
    process.exit(1);
  }
};

seedArticles();