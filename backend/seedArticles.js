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

    // Remove existing articles
    const deleteResult = await Article.deleteMany({});
    console.log(`🗑️  Existing articles removed: ${deleteResult.deletedCount}`);

    // Insert new articles
    const insertedArticles = await Article.insertMany(allArticles);
    console.log(`🚀 ${insertedArticles.length} articles seeded successfully`);

    // Display sample of seeded articles
    console.log("\n📝 Sample of seeded articles:");
    console.log("First article:", insertedArticles[0].title, "- Date:", insertedArticles[0].publishDate);
    console.log("Last article:", insertedArticles[insertedArticles.length - 1].title, "- Date:", insertedArticles[insertedArticles.length - 1].publishDate);

    // Verify date ordering (latest first)
    const articlesFromDB = await Article.find({}).sort({ publishDate: -1 }).limit(5);
    console.log("\n📅 Top 5 articles by date (should be Feb 9, 8, 7, etc.):");
    articlesFromDB.forEach((article, index) => {
      console.log(`${index + 1}. ${article.title} - ${article.publishDate.toDateString()}`);
    });

    console.log("\n✅ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    console.error("Error details:", error.message);
    process.exit(1);
  }
};

seedArticles();