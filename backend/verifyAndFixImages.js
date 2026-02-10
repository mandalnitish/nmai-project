import mongoose from "mongoose";
import dotenv from "dotenv";
import Article from "./models/Article.js";

dotenv.config();

/**
 * VERIFY AND FIX IMAGE URLS IN DATABASE
 * This script checks all articles in the database and ensures they have valid Cloudinary URLs
 */

const verifyAndFixImages = async () => {
  try {
    console.log('\n' + '='.repeat(80));
    console.log('🔍 VERIFY AND FIX IMAGE URLs IN DATABASE');
    console.log('='.repeat(80) + '\n');

    // Connect to MongoDB
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected\n');

    // Get all articles
    const articles = await Article.find({});
    console.log(`📊 Total articles in database: ${articles.length}\n`);

    if (articles.length === 0) {
      console.log('⚠️  No articles found in database');
      process.exit(0);
    }

    // Categorize articles by image status
    let validCloudinary = 0;
    let invalidUrls = [];
    let missingImages = [];
    let localPaths = [];
    let fixedCount = 0;

    const cloudinaryBase = 'https://res.cloudinary.com/dyftyrehc/image/upload/';
    const defaultImage = `${cloudinaryBase}v1770720000/nmai-articles/default.jpg`;

    console.log('🔍 Analyzing image URLs...\n');

    for (const article of articles) {
      const imageUrl = article.featuredImage?.url;

      if (!imageUrl || imageUrl === '' || imageUrl === null) {
        // Missing image
        missingImages.push({
          id: article._id,
          title: article.title,
          slug: article.slug
        });
      } else if (imageUrl.includes('cloudinary.com') || imageUrl.includes('res.cloudinary')) {
        // Valid Cloudinary URL
        validCloudinary++;
      } else if (imageUrl.startsWith('/images/') || imageUrl.startsWith('images/')) {
        // Local path that needs conversion
        localPaths.push({
          id: article._id,
          title: article.title,
          slug: article.slug,
          currentUrl: imageUrl
        });
      } else {
        // Other invalid URLs
        invalidUrls.push({
          id: article._id,
          title: article.title,
          slug: article.slug,
          currentUrl: imageUrl
        });
      }
    }

    // Display analysis results
    console.log('='.repeat(80));
    console.log('📊 IMAGE URL ANALYSIS');
    console.log('='.repeat(80));
    console.log(`✅ Valid Cloudinary URLs: ${validCloudinary}`);
    console.log(`📁 Local paths needing conversion: ${localPaths.length}`);
    console.log(`❌ Invalid URLs: ${invalidUrls.length}`);
    console.log(`⚠️  Missing images: ${missingImages.length}`);
    console.log('='.repeat(80) + '\n');

    // Show examples
    if (localPaths.length > 0) {
      console.log('📁 Sample local paths found:\n');
      localPaths.slice(0, 5).forEach((item, idx) => {
        console.log(`${idx + 1}. ${item.title.substring(0, 60)}`);
        console.log(`   Current: ${item.currentUrl}`);
        console.log('');
      });
    }

    if (invalidUrls.length > 0) {
      console.log('❌ Sample invalid URLs found:\n');
      invalidUrls.slice(0, 5).forEach((item, idx) => {
        console.log(`${idx + 1}. ${item.title.substring(0, 60)}`);
        console.log(`   Current: ${item.currentUrl}`);
        console.log('');
      });
    }

    // Ask for confirmation to fix
    if (localPaths.length > 0 || invalidUrls.length > 0 || missingImages.length > 0) {
      console.log('🔧 FIXING IMAGE URLs...\n');

      // Fix local paths
      for (const item of localPaths) {
        try {
          const filename = item.currentUrl.split('/').pop();
          const newUrl = `${cloudinaryBase}v1770720000/nmai-articles/${filename}`;

          await Article.updateOne(
            { _id: item.id },
            {
              $set: {
                'featuredImage.url': newUrl,
                'featuredImage.cloudinaryId': `nmai-articles/${filename}`,
                'featuredImage.alt': item.title
              }
            }
          );

          console.log(`✅ Fixed: ${item.title.substring(0, 50)}`);
          console.log(`   New URL: ${newUrl.substring(0, 80)}...`);
          fixedCount++;
        } catch (error) {
          console.error(`❌ Error fixing ${item.title}:`, error.message);
        }
      }

      // Fix invalid URLs
      for (const item of invalidUrls) {
        try {
          // Try to extract filename if possible
          let newUrl = defaultImage;
          
          if (item.currentUrl.includes('/')) {
            const filename = item.currentUrl.split('/').pop();
            if (filename && filename.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
              newUrl = `${cloudinaryBase}v1770720000/nmai-articles/${filename}`;
            }
          }

          await Article.updateOne(
            { _id: item.id },
            {
              $set: {
                'featuredImage.url': newUrl,
                'featuredImage.cloudinaryId': newUrl === defaultImage ? 'nmai-articles/default' : `nmai-articles/${item.currentUrl.split('/').pop()}`,
                'featuredImage.alt': item.title
              }
            }
          );

          console.log(`✅ Fixed: ${item.title.substring(0, 50)}`);
          console.log(`   New URL: ${newUrl.substring(0, 80)}...`);
          fixedCount++;
        } catch (error) {
          console.error(`❌ Error fixing ${item.title}:`, error.message);
        }
      }

      // Fix missing images
      for (const item of missingImages) {
        try {
          await Article.updateOne(
            { _id: item.id },
            {
              $set: {
                'featuredImage.url': defaultImage,
                'featuredImage.cloudinaryId': 'nmai-articles/default',
                'featuredImage.alt': item.title
              }
            }
          );

          console.log(`✅ Added default image: ${item.title.substring(0, 50)}`);
          fixedCount++;
        } catch (error) {
          console.error(`❌ Error fixing ${item.title}:`, error.message);
        }
      }
    }

    // Final verification
    console.log('\n' + '='.repeat(80));
    console.log('🔍 FINAL VERIFICATION');
    console.log('='.repeat(80));

    const finalCloudinary = await Article.countDocuments({
      'featuredImage.url': { $regex: 'cloudinary.com' }
    });

    const finalMissing = await Article.countDocuments({
      $or: [
        { 'featuredImage.url': { $exists: false } },
        { 'featuredImage.url': null },
        { 'featuredImage.url': "" }
      ]
    });

    console.log(`✅ Articles with Cloudinary URLs: ${finalCloudinary}`);
    console.log(`❌ Articles still missing images: ${finalMissing}`);
    console.log(`🔧 Total fixes applied: ${fixedCount}`);
    console.log('='.repeat(80));

    // Show sample of fixed articles
    if (fixedCount > 0) {
      console.log('\n📋 Sample of updated articles:\n');
      
      const samples = await Article.find({
        'featuredImage.url': { $regex: 'cloudinary.com' }
      })
        .sort({ publishDate: -1 })
        .limit(5)
        .select('title featuredImage.url publishDate');

      samples.forEach((article, idx) => {
        const date = new Date(article.publishDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        
        console.log(`${idx + 1}. ${article.title.substring(0, 60)}`);
        console.log(`   Date: ${date}`);
        console.log(`   Image: ${article.featuredImage.url.substring(0, 80)}...`);
        console.log('');
      });
    }

    // Recommendations
    console.log('💡 NEXT STEPS:');
    console.log('='.repeat(80));
    console.log('1. Restart your backend server');
    console.log('2. Clear browser cache (Ctrl + Shift + R)');
    console.log('3. Check your website - all images should load now');
    console.log('4. If any images are missing, upload them to Cloudinary');
    console.log('5. Update the IMAGE_MAP in allArticles.js with correct URLs');
    console.log('='.repeat(80));

    console.log('\n✅ Verification and fixes completed!\n');

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

verifyAndFixImages();