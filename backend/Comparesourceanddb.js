import mongoose from "mongoose";
import allArticles from "./allArticles.js";
import Article from "./models/Article.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * COMPARE DATABASE WITH allArticles.js
 * Shows what's different between source file and database
 */

const compareSourceAndDB = async () => {
  try {
    console.log('\n' + '='.repeat(80));
    console.log('🔍 COMPARE allArticles.js WITH DATABASE');
    console.log('='.repeat(80) + '\n');

    // Check source file
    if (!allArticles || allArticles.length === 0) {
      throw new Error("❌ No articles found in allArticles.js");
    }

    console.log(`📄 Source File (allArticles.js): ${allArticles.length} articles\n`);

    // Connect to MongoDB
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected\n');

    // Get database articles
    const dbArticles = await Article.find({});
    console.log(`🗄️  Database: ${dbArticles.length} articles\n`);

    // Create slug sets
    const sourceSlugs = new Set(allArticles.map(a => a.slug));
    const dbSlugs = new Set(dbArticles.map(a => a.slug));

    // Find differences
    const onlyInSource = allArticles.filter(a => !dbSlugs.has(a.slug));
    const onlyInDB = dbArticles.filter(a => !sourceSlugs.has(a.slug));
    const inBoth = allArticles.filter(a => dbSlugs.has(a.slug));

    console.log('='.repeat(80));
    console.log('📊 COMPARISON RESULTS');
    console.log('='.repeat(80));
    console.log(`✅ In both source & database: ${inBoth.length}`);
    console.log(`📄 Only in source file (need to add): ${onlyInSource.length}`);
    console.log(`🗄️  Only in database (extra, can remove): ${onlyInDB.length}`);
    console.log('='.repeat(80) + '\n');

    if (onlyInSource.length > 0) {
      console.log('📄 Articles in SOURCE but NOT in DATABASE:\n');
      onlyInSource.slice(0, 10).forEach((article, idx) => {
        const date = new Date(article.publishDate).toLocaleDateString();
        console.log(`${idx + 1}. ${article.title.substring(0, 60)}`);
        console.log(`   Date: ${date} | Slug: ${article.slug}`);
      });
      if (onlyInSource.length > 10) {
        console.log(`\n   ... and ${onlyInSource.length - 10} more\n`);
      }
    }

    if (onlyInDB.length > 0) {
      console.log('\n🗄️  Articles in DATABASE but NOT in SOURCE (extras):\n');
      
      // Group by date
      const byDate = {};
      onlyInDB.forEach(article => {
        const date = new Date(article.publishDate).toLocaleDateString();
        if (!byDate[date]) byDate[date] = [];
        byDate[date].push(article);
      });

      let shown = 0;
      for (const [date, articles] of Object.entries(byDate).sort().reverse()) {
        if (shown >= 15) break;
        
        console.log(`\n📅 ${date} (${articles.length} articles):`);
        articles.slice(0, 3).forEach(article => {
          shown++;
          console.log(`   - ${article.title.substring(0, 60)}`);
          console.log(`     Slug: ${article.slug} | Views: ${article.viewCount || 0}`);
        });
        
        if (articles.length > 3) {
          console.log(`   ... and ${articles.length - 3} more from this date`);
        }
      }

      if (onlyInDB.length > 15) {
        console.log(`\n   ... and ${onlyInDB.length - 15} more not shown\n`);
      }
    }

    // Recommendation
    console.log('\n' + '='.repeat(80));
    console.log('💡 RECOMMENDATION');
    console.log('='.repeat(80));

    if (onlyInDB.length > 0) {
      console.log('⚠️  Your database has EXTRA articles not in allArticles.js');
      console.log(`   Database: ${dbArticles.length} articles`);
      console.log(`   Source: ${allArticles.length} articles`);
      console.log(`   Difference: ${onlyInDB.length} extra articles\n`);
      
      console.log('🔧 SOLUTION: Run the sync script to clean database:');
      console.log('   node syncDatabaseWithSource.js\n');
      
      console.log('   This will:');
      console.log(`   ✅ Keep ${inBoth.length} articles that are in both`);
      console.log(`   ✅ Add ${onlyInSource.length} new articles from source`);
      console.log(`   🗑️  Remove ${onlyInDB.length} extra articles from database`);
      console.log(`   ✅ Result: Database will have exactly ${allArticles.length} articles`);
    } else if (onlyInSource.length > 0) {
      console.log('✅ Database is clean (no extra articles)');
      console.log(`📝 But ${onlyInSource.length} articles from source need to be added\n`);
      console.log('🔧 SOLUTION: Run seeding:');
      console.log('   node seedArticles.js');
    } else {
      console.log('🎉 PERFECT! Database is in sync with source file');
      console.log(`   Both have ${allArticles.length} articles`);
    }

    console.log('='.repeat(80));

    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    
    process.exit(1);
  }
};

compareSourceAndDB();