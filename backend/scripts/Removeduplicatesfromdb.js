import mongoose from "mongoose";
import dotenv from "dotenv";
import Article from "./models/Article.js";

dotenv.config();

/**
 * FIND AND REMOVE DUPLICATE ARTICLES FROM DATABASE
 * Duplicates are identified by slug
 */

const removeDuplicatesFromDB = async () => {
  try {
    console.log('\n' + '='.repeat(80));
    console.log('🔍 FIND AND REMOVE DUPLICATES FROM DATABASE');
    console.log('='.repeat(80) + '\n');

    // Connect to MongoDB
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected\n');

    // Find all articles
    const allArticles = await Article.find({}).sort({ publishDate: -1 });
    console.log(`📊 Total articles in database: ${allArticles.length}\n`);

    // Group by slug
    console.log('🔍 Analyzing for duplicates...\n');
    
    const slugMap = new Map();
    const duplicates = [];

    allArticles.forEach((article) => {
      if (slugMap.has(article.slug)) {
        // Duplicate found
        const existing = slugMap.get(article.slug);
        duplicates.push({
          slug: article.slug,
          existing: {
            id: existing._id,
            title: existing.title,
            date: existing.publishDate,
            views: existing.viewCount || 0,
            createdAt: existing.createdAt
          },
          duplicate: {
            id: article._id,
            title: article.title,
            date: article.publishDate,
            views: article.viewCount || 0,
            createdAt: article.createdAt
          }
        });
      } else {
        slugMap.set(article.slug, article);
      }
    });

    console.log('='.repeat(80));
    console.log('📊 DUPLICATE ANALYSIS');
    console.log('='.repeat(80));
    console.log(`✅ Unique articles: ${slugMap.size}`);
    console.log(`❌ Duplicate entries found: ${duplicates.length}`);
    console.log('='.repeat(80) + '\n');

    if (duplicates.length === 0) {
      console.log('🎉 No duplicates found! Your database is clean.\n');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Show duplicates
    console.log('📋 Duplicate articles found:\n');
    
    duplicates.forEach((dup, idx) => {
      console.log(`${idx + 1}. Slug: ${dup.slug}`);
      console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`   🔵 KEEPING: ${dup.existing.title.substring(0, 60)}`);
      console.log(`      ID: ${dup.existing.id}`);
      console.log(`      Date: ${new Date(dup.existing.date).toLocaleDateString()}`);
      console.log(`      Views: ${dup.existing.views}`);
      console.log(`      Created: ${new Date(dup.existing.createdAt).toLocaleString()}`);
      console.log('');
      console.log(`   🔴 REMOVING: ${dup.duplicate.title.substring(0, 60)}`);
      console.log(`      ID: ${dup.duplicate.id}`);
      console.log(`      Date: ${new Date(dup.duplicate.date).toLocaleDateString()}`);
      console.log(`      Views: ${dup.duplicate.views}`);
      console.log(`      Created: ${new Date(dup.duplicate.createdAt).toLocaleString()}`);
      console.log('');
    });

    // Remove duplicates (keep the one with more views, or older one)
    console.log('🗑️  REMOVING DUPLICATES...\n');
    
    let removedCount = 0;
    let keptBetterVersion = 0;

    for (const dup of duplicates) {
      try {
        // Decide which one to keep
        let idToRemove = dup.duplicate.id;
        let idToKeep = dup.existing.id;

        // If duplicate has more views, keep it instead
        if (dup.duplicate.views > dup.existing.views) {
          idToRemove = dup.existing.id;
          idToKeep = dup.duplicate.id;
          keptBetterVersion++;
          console.log(`ℹ️  Keeping newer version with more views: ${dup.duplicate.title.substring(0, 50)}`);
        }

        // Remove the duplicate
        await Article.deleteOne({ _id: idToRemove });
        
        console.log(`✅ Removed duplicate: ${dup.slug}`);
        removedCount++;
      } catch (error) {
        console.error(`❌ Error removing duplicate ${dup.slug}:`, error.message);
      }
    }

    // Final verification
    console.log('\n' + '='.repeat(80));
    console.log('✅ CLEANUP SUMMARY');
    console.log('='.repeat(80));
    console.log(`🗑️  Duplicates removed: ${removedCount}`);
    console.log(`📊 Better versions kept: ${keptBetterVersion}`);
    
    const finalCount = await Article.countDocuments();
    console.log(`📈 Final article count: ${finalCount}`);
    console.log('='.repeat(80));

    // Verify no duplicates remain
    console.log('\n🔍 Final verification...\n');
    
    const allSlugs = await Article.distinct('slug');
    const allArticlesAfter = await Article.countDocuments();
    
    if (allSlugs.length === allArticlesAfter) {
      console.log('✅ SUCCESS: All articles now have unique slugs!');
    } else {
      console.log('⚠️  WARNING: Some duplicates may still exist');
      console.log(`   Unique slugs: ${allSlugs.length}`);
      console.log(`   Total articles: ${allArticlesAfter}`);
    }

    // Show latest articles
    console.log('\n📅 Latest 10 Articles After Cleanup:\n');
    
    const latest = await Article.find({})
      .sort({ publishDate: -1 })
      .limit(10)
      .select('title slug publishDate viewCount');

    latest.forEach((article, idx) => {
      const date = new Date(article.publishDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      
      console.log(`${idx + 1}. ${article.title.substring(0, 60)}`);
      console.log(`   Slug: ${article.slug}`);
      console.log(`   Date: ${date} | Views: ${article.viewCount || 0}`);
      console.log('');
    });

    console.log('💡 NEXT STEPS:');
    console.log('='.repeat(80));
    console.log('1. Restart your backend server');
    console.log('2. Clear browser cache');
    console.log('3. Verify website shows unique articles');
    console.log('4. Check that view counts are preserved');
    console.log('='.repeat(80));

    console.log('\n✅ Database cleanup completed!\n');

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

removeDuplicatesFromDB();