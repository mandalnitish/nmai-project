// seedDatabase.js - UPDATED VERSION
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nmai');
    console.log('✅ Connected to MongoDB');

    // Import models
    const Article = (await import('./models/Article.js')).default;
    
    // Import seed data
    const seedData = await import('./seed-articles.js');

    // Clear existing articles
    console.log('🔄 Clearing existing articles...');
    await Article.deleteMany({});
    console.log('✅ Cleared existing articles');

    // Get articles from seed data
    const articles = seedData.default || [];

    console.log(`📝 Found ${articles.length} articles to seed`);

    // Valid exam relevance values from Article schema
    const validExamRelevance = [
      "UPSC", "SSC", "Banking", "Railways", 
      "State PSC", "Defence", "Judiciary", "Engineering"
    ];

    // Transform articles to match MongoDB schema
    const articlesToInsert = articles.map((article, index) => {
      // Generate a valid ObjectId for author
      const authorId = new mongoose.Types.ObjectId();
      
      // Ensure we have a valid date
      let publishDate;
      try {
        publishDate = article.publishDate ? new Date(article.publishDate) : new Date();
        if (isNaN(publishDate.getTime())) {
          publishDate = new Date(Date.now() - index * 86400000);
        }
      } catch (error) {
        publishDate = new Date(Date.now() - index * 86400000);
      }

      let lastUpdated;
      try {
        lastUpdated = article.lastUpdated ? new Date(article.lastUpdated) : new Date();
        if (isNaN(lastUpdated.getTime())) {
          lastUpdated = new Date();
        }
      } catch (error) {
        lastUpdated = new Date();
      }

      // Filter examRelevance to only include valid values
      const validExamRelevanceValues = (article.examRelevance || [])
        .filter(exam => validExamRelevance.includes(exam))
        .slice(0, 3); // Limit to 3 values

      // If no valid examRelevance, add default
      if (validExamRelevanceValues.length === 0) {
        validExamRelevanceValues.push("UPSC");
      }

      // Generate unique slug if needed
      let slug = article.slug || `article-${index + 1}-${Date.now()}`;
      // Remove any special characters from slug
      slug = slug.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      return {
        title: article.title || `Article ${index + 1}`,
        slug: slug,
        summary: article.summary || 'No summary available',
        content: article.content || '<p>Content not available</p>',
        category: article.category || 'General',
        tags: (article.tags || []).slice(0, 5), // Limit to 5 tags
        examRelevance: validExamRelevanceValues,
        publishDate: publishDate,
        lastUpdated: lastUpdated,
        status: 'published',
        published: true,
        viewCount: article.viewCount || Math.floor(Math.random() * 10000) + 1000,
        likes: article.likes || Math.floor(Math.random() * 500) + 50,
        author: authorId,
        featuredImage: article.featuredImage || {
          url: `https://source.unsplash.com/random/800x400?${article.category || 'currentaffairs'},india`,
          alt: article.title || 'Article image'
        },
        readingTime: article.readingTime || '5 min',
        difficulty: article.difficulty || 'Intermediate',
        sources: article.sources || ['Government Reports', 'Research Papers'],
        isPremium: false,
        isActive: true
      };
    });

    // Insert articles in batches
    const batchSize = 25;
    let insertedCount = 0;
    let errors = 0;
    
    console.log('🔄 Inserting articles...');
    
    for (let i = 0; i < articlesToInsert.length; i += batchSize) {
      const batch = articlesToInsert.slice(i, i + batchSize);
      
      try {
        const result = await Article.insertMany(batch, { ordered: false });
        insertedCount += result.length;
        console.log(`✅ Inserted ${insertedCount}/${articlesToInsert.length} articles`);
      } catch (insertError) {
        if (insertError.writeErrors) {
          // Some documents failed, but others succeeded
          const successfulCount = insertError.insertedCount || 0;
          insertedCount += successfulCount;
          errors += insertError.writeErrors.length;
          console.log(`⚠️ Partially inserted batch: ${successfulCount} succeeded, ${insertError.writeErrors.length} failed`);
          
          // Log first few errors
          insertError.writeErrors.slice(0, 3).forEach(err => {
            console.log(`   Error: ${err.errmsg}`);
          });
        } else {
          console.error(`❌ Batch insert error:`, insertError.message);
          errors++;
        }
      }
      
      // Add a small delay
      if (i + batchSize < articlesToInsert.length) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }

    // Verify the seed
    const count = await Article.countDocuments();
    console.log(`\n📊 Total articles in database: ${count}`);
    console.log(`⚠️  Errors encountered: ${errors}`);

    if (count > 0) {
      // Get some sample articles to verify
      const sample = await Article.find().limit(5).select('title slug category viewCount examRelevance');
      console.log('\n📋 Sample articles:');
      sample.forEach(article => {
        console.log(`   - "${article.title.substring(0, 40)}..."`);
        console.log(`     Slug: ${article.slug}`);
        console.log(`     Category: ${article.category} | Views: ${article.viewCount}`);
        console.log(`     Exams: ${article.examRelevance.join(', ')}`);
      });

      console.log('\n🎉 Database seeding completed!');
      console.log('\n🔗 Test URLs:');
      console.log('   • /api/articles/union-budget-2026-complete-analysis');
      console.log('   • /api/articles/rbi-monetary-policy-2026');
      console.log('   • /api/articles');
    } else {
      console.log('❌ No articles were inserted. Check the errors above.');
    }

    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();