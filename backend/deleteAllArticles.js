import mongoose from "mongoose";
import Article from "./models/Article.js";
import dotenv from "dotenv";

dotenv.config();

console.log("MONGODB_URI =", process.env.MONGODB_URI ? "✅ Connected" : "❌ Missing");

const deleteAllArticles = async () => {
  try {
    console.log('\n' + '='.repeat(80));
    console.log('🗑️  DELETE ALL ARTICLES FROM DATABASE');
    console.log('='.repeat(80));
    console.log('⚠️  WARNING: This will DELETE ALL articles from your database!');
    console.log('='.repeat(80));

    // Connect to MongoDB
    console.log("\n🔗 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected\n");

    // Get current count
    const currentCount = await Article.countDocuments();
    console.log(`📊 Current article count: ${currentCount}\n`);

    if (currentCount === 0) {
      console.log('ℹ️  Database is already empty. Nothing to delete.\n');
      process.exit(0);
    }

    // Show some sample articles before deletion
    console.log('📄 Sample articles that will be deleted:\n');
    const sampleArticles = await Article.find({})
      .limit(10)
      .select('title publishDate slug');

    sampleArticles.forEach((article, index) => {
      const date = new Date(article.publishDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      console.log(`   ${index + 1}. ${date} - ${article.title.substring(0, 60)}`);
    });

    console.log(`\n   ... and ${currentCount - sampleArticles.length} more articles\n`);

    // Delete all articles
    console.log('🗑️  Deleting all articles...\n');
    const deleteResult = await Article.deleteMany({});

    console.log('='.repeat(80));
    console.log('✅ DELETION COMPLETE');
    console.log('='.repeat(80));
    console.log(`🗑️  Articles deleted: ${deleteResult.deletedCount}`);
    
    // Verify deletion
    const remainingCount = await Article.countDocuments();
    console.log(`📊 Remaining articles: ${remainingCount}`);

    if (remainingCount === 0) {
      console.log('\n✅ SUCCESS: Database is now completely empty!\n');
    } else {
      console.log(`\n⚠️  WARNING: ${remainingCount} articles still remain in database.\n`);
    }

    console.log('='.repeat(80));
    console.log('💡 NEXT STEPS:');
    console.log('   1. Run: node seedArticles.js');
    console.log('   2. This will re-upload all articles fresh from allArticles.js');
    console.log('   3. Restart your backend server');
    console.log('   4. Clear browser cache and verify your website\n');
    console.log('='.repeat(80));

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error deleting articles:", error);
    console.error("Error details:", error.message);
    if (error.stack) {
      console.error("Stack trace:", error.stack);
    }
    process.exit(1);
  }
};

deleteAllArticles();