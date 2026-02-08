// seedDatabase.js - ENHANCED VERSION with Image Support
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Validates image URL
 * @param {string} url - Image URL to validate
 * @returns {boolean} - True if valid
 */
const isValidImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  
  // Check if it's a valid URL format
  try {
    new URL(url);
  } catch {
    return false;
  }
  
  // Accept common image hosting domains and formats
  const validPatterns = [
    /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)/i,
    /^https?:\/\/images\.unsplash\.com/i,
    /^https?:\/\/source\.unsplash\.com/i,
    /^https?:\/\/via\.placeholder\.com/i,
    /^https?:\/\/.+\.cloudinary\.com/i,
    /^https?:\/\/.+\.imgur\.com/i,
    /^https?:\/\/.+\.amazonaws\.com/i,
  ];
  
  return validPatterns.some(pattern => pattern.test(url));
};

/**
 * Gets a fallback image based on category
 * @param {string} category - Article category
 * @returns {object} - Image object with url and alt
 */
const getFallbackImage = (category) => {
  const categoryImages = {
    'Economy': 'https://source.unsplash.com/random/800x400?economy,finance,india',
    'Polity': 'https://source.unsplash.com/random/800x400?government,parliament,india',
    'Science': 'https://source.unsplash.com/random/800x400?science,research,india',
    'Technology': 'https://source.unsplash.com/random/800x400?technology,innovation,india',
    'Environment': 'https://source.unsplash.com/random/800x400?environment,nature,india',
    'International': 'https://source.unsplash.com/random/800x400?world,diplomacy,global',
    'Social': 'https://source.unsplash.com/random/800x400?society,community,india',
    'Defence': 'https://source.unsplash.com/random/800x400?military,defense,india',
    'History': 'https://source.unsplash.com/random/800x400?history,heritage,india',
    'Geography': 'https://source.unsplash.com/random/800x400?geography,landscape,india'
  };
  
  return {
    url: categoryImages[category] || 'https://source.unsplash.com/random/800x400?india,education',
    alt: `${category} related image`
  };
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nmai');
    console.log('✅ Connected to MongoDB');

    // Import models
    const Article = (await import('./models/Article.js')).default;
    
    // Import seed data
    const seedData = await import('./seed-articles.js');

    // Clear existing articles (optional - comment out if you want to keep existing)
    console.log('🗑️  Clearing existing articles...');
    await Article.deleteMany({});
    console.log('✅ Cleared existing articles');

    // Get articles from seed data
    const articles = seedData.default || [];

    if (articles.length === 0) {
      console.log('⚠️  No articles found in seed data. Please add articles to seed-articles.js');
      process.exit(1);
    }

    console.log(`📚 Found ${articles.length} articles to seed`);

    // Valid exam relevance values
    const validExamRelevance = [
      "UPSC", "SSC", "Banking", "Railways", 
      "State PSC", "Defence", "Judiciary", "Engineering"
    ];

    // Valid categories
    const validCategories = [
      "Economy", "Polity", "Science", "Technology", "Environment",
      "International", "Social", "Defence", "History", "Geography"
    ];

    // Transform articles to match MongoDB schema
    const articlesToInsert = articles.map((article, index) => {
      // Generate a valid ObjectId for author
      const authorId = new mongoose.Types.ObjectId();
      
      // Validate and format dates
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

      // Validate and filter exam relevance
      const validExamRelevanceValues = (article.examRelevance || [])
        .filter(exam => validExamRelevance.includes(exam))
        .slice(0, 3);

      if (validExamRelevanceValues.length === 0) {
        validExamRelevanceValues.push("UPSC");
      }

      // Validate category
      let category = article.category || 'General';
      if (!validCategories.includes(category)) {
        category = 'General';
      }

      // Generate unique slug
      let slug = article.slug || `article-${index + 1}-${Date.now()}`;
      slug = slug.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Handle featured image
      let featuredImage;
      
      if (article.featuredImage && typeof article.featuredImage === 'object') {
        // User provided a featuredImage object
        if (isValidImageUrl(article.featuredImage.url)) {
          featuredImage = {
            url: article.featuredImage.url,
            alt: article.featuredImage.alt || article.title || 'Article image'
          };
        } else {
          console.log(`⚠️  Invalid image URL for "${article.title}", using fallback`);
          featuredImage = getFallbackImage(category);
        }
      } else if (article.featuredImage && typeof article.featuredImage === 'string') {
        // User provided just a URL string
        if (isValidImageUrl(article.featuredImage)) {
          featuredImage = {
            url: article.featuredImage,
            alt: article.title || 'Article image'
          };
        } else {
          console.log(`⚠️  Invalid image URL for "${article.title}", using fallback`);
          featuredImage = getFallbackImage(category);
        }
      } else {
        // No image provided, use fallback
        featuredImage = getFallbackImage(category);
      }

      // Validate content
      let content = article.content || '<p>Content not available</p>';
      if (typeof content !== 'string' || content.trim().length === 0) {
        content = '<p>Content not available</p>';
      }

      // Validate reading time
      let readingTime = article.readingTime || '5 min';
      if (!/^\d+\s*min$/.test(readingTime)) {
        readingTime = '5 min';
      }

      // Validate difficulty
      const validDifficulties = ['Beginner', 'Intermediate', 'Advanced'];
      let difficulty = article.difficulty || 'Intermediate';
      if (!validDifficulties.includes(difficulty)) {
        difficulty = 'Intermediate';
      }

      return {
        title: article.title || `Article ${index + 1}`,
        slug: slug,
        summary: article.summary || 'No summary available',
        content: content,
        category: category,
        tags: (article.tags || []).slice(0, 5),
        examRelevance: validExamRelevanceValues,
        publishDate: publishDate,
        lastUpdated: lastUpdated,
        status: 'published',
        published: true,
        viewCount: article.viewCount || Math.floor(Math.random() * 10000) + 1000,
        likes: article.likes || Math.floor(Math.random() * 500) + 50,
        author: authorId,
        featuredImage: featuredImage,
        readingTime: readingTime,
        difficulty: difficulty,
        sources: article.sources || ['Official Sources', 'Research Papers'],
        isPremium: article.isPremium || false,
        isActive: true
      };
    });

    // Insert articles in batches
    const batchSize = 25;
    let insertedCount = 0;
    let errors = 0;
    
    console.log('📤 Inserting articles...');
    
    for (let i = 0; i < articlesToInsert.length; i += batchSize) {
      const batch = articlesToInsert.slice(i, i + batchSize);
      
      try {
        const result = await Article.insertMany(batch, { ordered: false });
        insertedCount += result.length;
        console.log(`✅ Inserted ${insertedCount}/${articlesToInsert.length} articles`);
      } catch (insertError) {
        if (insertError.writeErrors) {
          const successfulCount = insertError.insertedCount || 0;
          insertedCount += successfulCount;
          errors += insertError.writeErrors.length;
          console.log(`⚠️  Partially inserted batch: ${successfulCount} succeeded, ${insertError.writeErrors.length} failed`);
          
          insertError.writeErrors.slice(0, 3).forEach(err => {
            console.log(`   Error: ${err.errmsg}`);
          });
        } else {
          console.error(`❌ Batch insert error:`, insertError.message);
          errors++;
        }
      }
      
      // Small delay to prevent overwhelming the database
      if (i + batchSize < articlesToInsert.length) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }

    // Verify the seed
    const count = await Article.countDocuments();
    console.log(`\n📊 Database Seeding Summary:`);
    console.log(`   Total articles in database: ${count}`);
    console.log(`   Successfully inserted: ${insertedCount}`);
    console.log(`   Errors encountered: ${errors}`);

    if (count > 0) {
      // Get some sample articles to verify
      const sample = await Article.find().limit(5).select('title slug category featuredImage viewCount examRelevance');
      console.log('\n📋 Sample articles:');
      sample.forEach((article, idx) => {
        console.log(`\n   ${idx + 1}. "${article.title.substring(0, 50)}${article.title.length > 50 ? '...' : ''}"`);
        console.log(`      Slug: ${article.slug}`);
        console.log(`      Category: ${article.category} | Views: ${article.viewCount}`);
        console.log(`      Image: ${article.featuredImage?.url?.substring(0, 60)}...`);
        console.log(`      Exams: ${article.examRelevance.join(', ')}`);
      });

      console.log('\n🎉 Database seeding completed successfully!');
      console.log('\n🔗 Test Your API:');
      console.log('   • GET /api/articles - Get all articles');
      console.log('   • GET /api/articles/:slug - Get specific article');
      console.log('\n📝 Sample slugs to test:');
      const testSlugs = await Article.find().limit(3).select('slug');
      testSlugs.forEach(article => {
        console.log(`   • /api/articles/${article.slug}`);
      });
    } else {
      console.log('\n❌ No articles were inserted. Please check:');
      console.log('   1. Your seed-articles.js file has valid articles');
      console.log('   2. MongoDB connection is working');
      console.log('   3. Article model schema matches the data');
    }

    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error seeding database:');
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();