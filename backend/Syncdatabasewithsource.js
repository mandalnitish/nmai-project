import mongoose from "mongoose";
import allArticles from "./allArticles.js";
import Article from "./models/Article.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * SYNC DATABASE WITH allArticles.js
 * This script will:
 * 1. Remove articles from DB that are NOT in allArticles.js
 * 2. Add/Update articles from allArticles.js
 * 3. Result: DB will have exactly 134 articles matching allArticles.js
 */

const syncDatabase = async () => {
  try {
    console.log('\n' + '='.repeat(80));
    console.log('🔄 SYNC DATABASE WITH allArticles.js');
    console.log('='.repeat(80) + '\n');

    // Validate source file
    if (!allArticles || allArticles.length === 0) {
      throw new Error("❌ No articles found in allArticles.js");
    }

    console.log(`📊 Source: allArticles.js has ${allArticles.length} articles\n`);

    // Connect to MongoDB
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected\n');

    // Get current database state
    const dbArticles = await Article.find({});
    console.log(`📊 Database: Currently has ${dbArticles.length} articles\n`);

    // Create a Set of slugs from allArticles.js (our source of truth)
    const validSlugs = new Set(allArticles.map(article => article.slug));
    console.log(`✅ Valid slugs from allArticles.js: ${validSlugs.size}\n`);

    // Find articles in DB that are NOT in allArticles.js (to be removed)
    const articlesToRemove = dbArticles.filter(article => !validSlugs.has(article.slug));
    
    console.log('='.repeat(80));
    console.log('📊 ANALYSIS');
    console.log('='.repeat(80));
    console.log(`✅ Articles to keep/update: ${validSlugs.size}`);
    console.log(`🗑️  Articles to remove: ${articlesToRemove.length}`);
    console.log(`📈 Expected final count: ${validSlugs.size}`);
    console.log('='.repeat(80) + '\n');

    if (articlesToRemove.length > 0) {
      console.log('📋 Articles that will be REMOVED (not in allArticles.js):\n');
      
      // Group by date for better visualization
      const byDate = {};
      articlesToRemove.forEach(article => {
        const date = new Date(article.publishDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        if (!byDate[date]) byDate[date] = [];
        byDate[date].push(article);
      });

      // Show first 20 articles to be removed
      let count = 0;
      for (const [date, articles] of Object.entries(byDate)) {
        console.log(`\n📅 ${date} (${articles.length} articles):`);
        articles.slice(0, 5).forEach(article => {
          count++;
          if (count <= 20) {
            console.log(`   ${count}. ${article.title.substring(0, 60)}`);
            console.log(`      Slug: ${article.slug}`);
            console.log(`      Views: ${article.viewCount || 0}`);
          }
        });
        if (articles.length > 5) {
          console.log(`   ... and ${articles.length - 5} more from this date`);
        }
      }

      if (articlesToRemove.length > 20) {
        console.log(`\n   ... and ${articlesToRemove.length - 20} more articles not shown`);
      }

      console.log('\n' + '⚠️'.repeat(40));
      console.log('⚠️  WARNING: This will DELETE these articles from database!');
      console.log('⚠️  View counts and engagement data will be LOST!');
      console.log('⚠️'.repeat(40));
      console.log('\n⏸️  PAUSED - Review the list above carefully!\n');
      
      // For safety, let's create a backup report
      const backupData = articlesToRemove.map(article => ({
        title: article.title,
        slug: article.slug,
        publishDate: article.publishDate,
        viewCount: article.viewCount || 0,
        likes: article.likes || 0,
        bookmarks: article.bookmarks || 0,
      }));

      const fs = await import('fs');
      const backupFile = `articles-to-remove-backup-${Date.now()}.json`;
      fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
      console.log(`💾 Backup created: ${backupFile}\n`);

      // Proceed with deletion
      console.log('🗑️  REMOVING EXTRA ARTICLES...\n');

      let removedCount = 0;
      for (const article of articlesToRemove) {
        try {
          await Article.deleteOne({ _id: article._id });
          console.log(`✅ Removed: ${article.title.substring(0, 60)}`);
          removedCount++;
        } catch (error) {
          console.error(`❌ Error removing ${article.title}:`, error.message);
        }
      }

      console.log(`\n✅ Removed ${removedCount} articles\n`);
    } else {
      console.log('✅ No extra articles to remove - database is clean!\n');
    }

    // Now sync with allArticles.js (add/update)
    console.log('🔄 SYNCING WITH allArticles.js...\n');

    let newCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;

    for (const articleData of allArticles) {
      try {
        const existing = await Article.findOne({ slug: articleData.slug });

        if (existing) {
          // Check if needs update
          const needsUpdate = 
            existing.title !== articleData.title ||
            existing.content !== articleData.content ||
            existing.summary !== articleData.summary ||
            existing.featuredImage?.url !== articleData.featuredImage?.url;

          if (needsUpdate) {
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
                }
              }
            );
            console.log(`🔄 Updated: ${articleData.title.substring(0, 60)}`);
            updatedCount++;
          } else {
            skippedCount++;
          }
        } else {
          // New article
          await Article.create(articleData);
          console.log(`✅ Added: ${articleData.title.substring(0, 60)}`);
          newCount++;
        }
      } catch (error) {
        console.error(`❌ Error processing ${articleData.title}:`, error.message);
      }
    }

    // Final verification
    console.log('\n' + '='.repeat(80));
    console.log('🔍 FINAL VERIFICATION');
    console.log('='.repeat(80));

    const finalCount = await Article.countDocuments();
    const feb10Count = await Article.countDocuments({
      publishDate: {
        $gte: new Date('2026-02-10T00:00:00.000Z'),
        $lt: new Date('2026-02-11T00:00:00.000Z')
      }
    });

    console.log(`📊 Source (allArticles.js): ${allArticles.length} articles`);
    console.log(`📊 Database after sync: ${finalCount} articles`);
    console.log(`📅 Feb 10, 2026 articles: ${feb10Count}`);

    if (finalCount === allArticles.length) {
      console.log('\n🎉 SUCCESS: Database is now in perfect sync!');
    } else {
      console.log('\n⚠️  WARNING: Counts don\'t match!');
      console.log(`   Expected: ${allArticles.length}`);
      console.log(`   Got: ${finalCount}`);
    }

    // Show latest articles
    console.log('\n📅 Latest 15 Articles in Database:\n');
    
    const latest = await Article.find({})
      .sort({ publishDate: -1 })
      .limit(15)
      .select('title publishDate viewCount featuredImage.url');

    latest.forEach((article, idx) => {
      const date = new Date(article.publishDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      
      const hasImage = article.featuredImage?.url?.includes('cloudinary.com');
      const imageIcon = hasImage ? '✅' : '❌';
      
      console.log(`${idx + 1}. ${date} - ${article.title.substring(0, 55)}`);
      console.log(`   Views: ${article.viewCount || 0} | Image: ${imageIcon}`);
    });

    // Summary
    console.log('\n' + '='.repeat(80));
    console.log('✅ SYNC SUMMARY');
    console.log('='.repeat(80));
    console.log(`🗑️  Articles removed: ${articlesToRemove.length}`);
    console.log(`✨ New articles added: ${newCount}`);
    console.log(`🔄 Articles updated: ${updatedCount}`);
    console.log(`⏭️  Articles skipped: ${skippedCount}`);
    console.log(`📊 Final database count: ${finalCount}`);
    console.log(`✅ Expected count: ${allArticles.length}`);
    console.log(`${finalCount === allArticles.length ? '🎉 PERFECT MATCH!' : '⚠️  COUNT MISMATCH'}`);
    console.log('='.repeat(80));

    console.log('\n💡 NEXT STEPS:');
    console.log('   1. ✅ Database is now synced with allArticles.js');
    console.log('   2. 🔄 Restart your backend server');
    console.log('   3. 🧹 Clear browser cache (Ctrl + Shift + R)');
    console.log('   4. 🌐 Visit your website and verify');
    console.log('   5. 👀 Check that only Feb 10 articles show as "Today"\n');

    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Sync failed:', error.message);
    console.error(error.stack);
    
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    
    process.exit(1);
  }
};

syncDatabase();