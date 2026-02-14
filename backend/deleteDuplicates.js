import mongoose from "mongoose";
import Article from "./models/Article.js";
import dotenv from "dotenv";

dotenv.config();

console.log("MONGODB_URI =", process.env.MONGODB_URI ? "✅ Connected" : "❌ Missing");

const deleteDuplicates = async () => {
  try {
    console.log('\n' + '='.repeat(80));
    console.log('🧹 FINDING AND DELETING DUPLICATE ARTICLES');
    console.log('='.repeat(80));

    // Connect to MongoDB
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected\n");

    // Get initial count
    const initialCount = await Article.countDocuments();
    console.log(`📊 Initial article count: ${initialCount}\n`);

    // Find duplicates by slug
    console.log('🔍 Searching for duplicates by slug...\n');
    
    const duplicates = await Article.aggregate([
      {
        $group: {
          _id: "$slug",
          count: { $sum: 1 },
          ids: { $push: "$_id" },
          titles: { $push: "$title" },
          dates: { $push: "$publishDate" }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    if (duplicates.length === 0) {
      console.log('✅ No duplicates found! Your database is clean.\n');
      process.exit(0);
    }

    console.log(`⚠️  Found ${duplicates.length} duplicate slugs:\n`);

    let totalDeleted = 0;

    // Process each duplicate group
    for (const dup of duplicates) {
      console.log(`\n${'─'.repeat(80)}`);
      console.log(`📝 Slug: ${dup._id}`);
      console.log(`   Duplicates found: ${dup.count}`);
      
      // Show all versions
      console.log(`   Versions:`);
      dup.ids.forEach((id, index) => {
        const date = new Date(dup.dates[index]).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        console.log(`     ${index + 1}. ${dup.titles[index].substring(0, 60)}`);
        console.log(`        Date: ${date} | ID: ${id}`);
      });

      // Keep the most recent one (first ID in the array after sorting by date)
      // Get full details to decide which to keep
      const articles = await Article.find({ _id: { $in: dup.ids } })
        .sort({ publishDate: -1, _id: -1 }); // Keep most recent, or newest _id if same date

      const keepArticle = articles[0];
      const deleteIds = articles.slice(1).map(a => a._id);

      console.log(`\n   ✅ Keeping: ${keepArticle.title.substring(0, 60)}`);
      console.log(`      Date: ${new Date(keepArticle.publishDate).toLocaleDateString('en-US')}`);
      console.log(`      Views: ${keepArticle.viewCount || 0}`);
      console.log(`      ID: ${keepArticle._id}`);
      
      console.log(`\n   🗑️  Deleting ${deleteIds.length} duplicate(s):`);
      articles.slice(1).forEach((article, index) => {
        console.log(`      ${index + 1}. ${article.title.substring(0, 60)}`);
        console.log(`         Date: ${new Date(article.publishDate).toLocaleDateString('en-US')}`);
        console.log(`         Views: ${article.viewCount || 0}`);
        console.log(`         ID: ${article._id}`);
      });

      // Delete the duplicates
      const deleteResult = await Article.deleteMany({ _id: { $in: deleteIds } });
      totalDeleted += deleteResult.deletedCount;
      
      console.log(`   ✅ Deleted ${deleteResult.deletedCount} duplicate(s)`);
    }

    // Final verification
    console.log('\n' + '='.repeat(80));
    console.log('🔍 VERIFICATION');
    console.log('='.repeat(80));

    const finalCount = await Article.countDocuments();
    
    console.log(`📊 Results:`);
    console.log(`   Initial articles: ${initialCount}`);
    console.log(`   Articles deleted: ${totalDeleted}`);
    console.log(`   Final articles: ${finalCount}`);
    console.log(`   Difference: ${initialCount - finalCount}`);

    // Check for remaining duplicates
    const remainingDuplicates = await Article.aggregate([
      {
        $group: {
          _id: "$slug",
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ]);

    if (remainingDuplicates.length === 0) {
      console.log('\n✅ SUCCESS: All duplicates removed! Database is now clean.\n');
    } else {
      console.log(`\n⚠️  WARNING: ${remainingDuplicates.length} duplicate slugs still remain.`);
      console.log('   You may need to run this script again.\n');
    }

    // Show latest articles
    console.log('📅 Latest 10 Articles After Cleanup:\n');
    
    const latestArticles = await Article.find({})
      .sort({ publishDate: -1 })
      .limit(10)
      .select('title publishDate slug');

    latestArticles.forEach((article, index) => {
      const date = new Date(article.publishDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      
      console.log(`${index + 1}. ${date} - ${article.title.substring(0, 50)}`);
      console.log(`   Slug: ${article.slug}\n`);
    });

    console.log('='.repeat(80));
    console.log('💡 NEXT STEPS:');
    console.log('   1. Restart your backend server');
    console.log('   2. Clear browser cache (Ctrl + Shift + R)');
    console.log('   3. Verify your website shows correct number of articles');
    console.log('   4. Check that no duplicate articles appear\n');

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error deleting duplicates:", error);
    console.error("Error details:", error.message);
    if (error.stack) {
      console.error("Stack trace:", error.stack);
    }
    process.exit(1);
  }
};

deleteDuplicates();