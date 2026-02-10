import mongoose from "mongoose";
import allArticles from "./allArticles.js";
import Article from "./models/Article.js";
import dotenv from "dotenv";

dotenv.config();

console.log("MONGODB_URI =", process.env.MONGODB_URI ? "✅ Connected" : "❌ Missing");

const seedArticles = async () => {
  try {
    // Validate that allArticles is imported correctly
    if (!allArticles || allArticles.length === 0) {
      throw new Error("❌ No articles found in allArticles.js");
    }

    console.log('\n' + '='.repeat(80));
    console.log('🌱 SEEDING ARTICLES TO DATABASE');
    console.log('='.repeat(80));
    console.log(`📊 Found ${allArticles.length} articles to seed\n`);

    // Connect to MongoDB
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected\n");

    let newArticlesCount = 0;
    let updatedArticlesCount = 0;
    let skippedArticlesCount = 0;
    let imageValidCount = 0;
    let imageInvalidCount = 0;

    console.log('📝 Processing articles...\n');

    // Process each article
    for (const articleData of allArticles) {
      try {
        // Validate image URL
        const imageUrl = articleData.featuredImage?.url;
        
        if (!imageUrl) {
          console.warn(`⚠️  No image URL for: ${articleData.title.substring(0, 60)}`);
          imageInvalidCount++;
        } else if (!imageUrl.startsWith('https://')) {
          console.warn(`⚠️  Invalid image URL for: ${articleData.title.substring(0, 60)}`);
          console.warn(`   URL: ${imageUrl}`);
          imageInvalidCount++;
        } else if (imageUrl.includes('cloudinary.com')) {
          imageValidCount++;
        } else {
          console.warn(`⚠️  Non-Cloudinary URL for: ${articleData.title.substring(0, 60)}`);
          imageInvalidCount++;
        }

        // Find existing article by slug
        const existingArticle = await Article.findOne({ slug: articleData.slug });

        if (existingArticle) {
          // Check if content needs updating
          const needsUpdate = 
            existingArticle.title !== articleData.title ||
            existingArticle.content !== articleData.content ||
            existingArticle.summary !== articleData.summary ||
            existingArticle.featuredImage?.url !== articleData.featuredImage?.url ||
            JSON.stringify(existingArticle.tags) !== JSON.stringify(articleData.tags);

          if (needsUpdate) {
            // Update article but preserve views, likes, bookmarks
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
                  featuredImage: articleData.featuredImage,
                  publishDate: articleData.publishDate,
                  // Preserve engagement metrics
                }
              }
            );
            
            console.log(`🔄 Updated: ${articleData.title.substring(0, 60)}`);
            updatedArticlesCount++;
          } else {
            skippedArticlesCount++;
          }
        } else {
          // New article - insert with all data
          await Article.create({
            ...articleData,
            viewCount: 0,
            likes: 0,
            bookmarks: 0,
          });
          
          const dateStr = new Date(articleData.publishDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });
          
          console.log(`✅ New: ${articleData.title.substring(0, 60)} (${dateStr})`);
          newArticlesCount++;
        }
      } catch (error) {
        console.error(`❌ Error processing "${articleData.title}":`, error.message);
      }
    }

    // Verify database state
    console.log('\n' + '='.repeat(80));
    console.log('🔍 VERIFICATION');
    console.log('='.repeat(80));
    
    const totalInDb = await Article.countDocuments();
    
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

    console.log(`📊 Database Statistics:`);
    console.log(`   Total articles in DB: ${totalInDb}`);
    console.log(`   Articles with images: ${articlesWithImages}`);
    console.log(`   Cloudinary images: ${cloudinaryImages} ✅`);
    console.log(`   Missing images: ${articlesWithoutImages} ${articlesWithoutImages > 0 ? '⚠️' : '✅'}`);

    // Show latest articles
    console.log('\n📅 Latest 10 Articles in Database:\n');
    
    const latestArticles = await Article.find({})
      .sort({ publishDate: -1 })
      .limit(10)
      .select('title publishDate viewCount featuredImage.url');

    latestArticles.forEach((article, index) => {
      const date = new Date(article.publishDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      
      const hasValidImage = article.featuredImage?.url?.includes('cloudinary.com');
      const imageIcon = hasValidImage ? '✅' : '❌';
      
      console.log(`${index + 1}. ${date} - ${article.title.substring(0, 50)}`);
      console.log(`   Views: ${article.viewCount || 0} | Image: ${imageIcon}`);
      
      if (article.featuredImage?.url) {
        const url = article.featuredImage.url;
        console.log(`   ${url.substring(0, 80)}${url.length > 80 ? '...' : ''}`);
      }
      console.log('');
    });

    // Articles by date
    const today = new Date('2026-02-10');
    today.setHours(0, 0, 0, 0);
    
    const todayCount = await Article.countDocuments({
      publishDate: { 
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    const yesterdayStart = new Date(today);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    
    const yesterdayCount = await Article.countDocuments({
      publishDate: { 
        $gte: yesterdayStart,
        $lt: today
      }
    });

    console.log('📊 Articles by Date:');
    console.log(`   Today (Feb 10, 2026): ${todayCount} articles`);
    console.log(`   Yesterday (Feb 9, 2026): ${yesterdayCount} articles`);

    // Summary
    console.log('\n' + '='.repeat(80));
    console.log('✅ SEEDING SUMMARY');
    console.log('='.repeat(80));
    console.log(`✨ New articles added: ${newArticlesCount}`);
    console.log(`🔄 Existing articles updated: ${updatedArticlesCount}`);
    console.log(`⏭️  Articles skipped (no changes): ${skippedArticlesCount}`);
    console.log(`✅ Valid Cloudinary images: ${imageValidCount}`);
    console.log(`⚠️  Image issues detected: ${imageInvalidCount}`);
    console.log(`📈 Total articles processed: ${allArticles.length}`);
    console.log('='.repeat(80));

    // Warnings
    if (imageInvalidCount > 0) {
      console.log('\n⚠️  WARNING: Some articles have invalid image URLs!');
      console.log('   Run: node scripts/migrateImagesToCloudinary.js');
    }

    if (articlesWithoutImages > 0) {
      console.log('\n⚠️  WARNING: Some articles in DB have no images!');
      console.log('   Check these articles and update them.');
    }

    if (cloudinaryImages === totalInDb) {
      console.log('\n🎉 SUCCESS: All articles have valid Cloudinary images!');
    }

    // Next steps
    console.log('\n💡 NEXT STEPS:');
    console.log('   1. Restart your backend server');
    console.log('   2. Clear browser cache (Ctrl + Shift + R)');
    console.log('   3. Visit your website and verify:');
    console.log('      - Articles are showing correct dates');
    console.log('      - All images are loading');
    console.log('      - No duplicate articles');
    console.log('   4. Open browser console to check for any errors\n');

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    console.error("Error details:", error.message);
    if (error.stack) {
      console.error("Stack trace:", error.stack);
    }
    process.exit(1);
  }
};

seedArticles();