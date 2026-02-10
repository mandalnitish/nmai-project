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

    // Process each article
    for (const articleData of allArticles) {
      try {
        // Find existing article by slug
        const existingArticle = await Article.findOne({ slug: articleData.slug });

        if (existingArticle) {
          // Article exists - preserve metadata, only update content if needed
          const hasContentChanges = 
            existingArticle.title !== articleData.title ||
            existingArticle.content !== articleData.content ||
            existingArticle.summary !== articleData.summary;

          if (hasContentChanges) {
            // Update only content fields, preserve all metadata
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
                  // DO NOT update: publishDate, createdAt, viewCount, likes, savedBy
                }
              }
            );
            updatedArticlesCount++;
            console.log(`📝 Updated content: ${articleData.title}`);
          } else {
            skippedArticlesCount++;
          }
        } else {
          // New article - insert with all data
          await Article.create(articleData);
          newArticlesCount++;
          console.log(`✅ New article: ${articleData.title} (${articleData.publishDate.toDateString()})`);
        }
      } catch (error) {
        console.error(`❌ Error processing article "${articleData.title}":`, error.message);
      }
    }

    console.log("\n" + "=".repeat(60));
    console.log("📊 SEEDING SUMMARY");
    console.log("=".repeat(60));
    console.log(`✨ New articles added: ${newArticlesCount}`);
    console.log(`📝 Existing articles updated: ${updatedArticlesCount}`);
    console.log(`⏭️  Articles skipped (no changes): ${skippedArticlesCount}`);
    console.log(`📈 Total articles processed: ${allArticles.length}`);

    // Verify latest articles
    const latestArticles = await Article.find({})
      .sort({ publishDate: -1 })
      .limit(5)
      .select('title publishDate viewCount');

    console.log("\n📅 Latest 5 articles in database:");
    latestArticles.forEach((article, index) => {
      const date = article.publishDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      console.log(`${index + 1}. ${date} - ${article.title} (${article.viewCount || 0} views)`);
    });

    // Show total count by date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayCount = await Article.countDocuments({
      publishDate: { $gte: today }
    });

    console.log(`\n📆 Articles published today: ${todayCount}`);

    console.log("\n✅ Seeding completed successfully!");
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