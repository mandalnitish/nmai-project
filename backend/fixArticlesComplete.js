import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * COMPLETE FIX: Deduplicate articles and ensure all images are properly linked
 * This script will:
 * 1. Remove duplicate articles (by slug)
 * 2. Ensure all articles have valid Cloudinary image URLs
 * 3. Create a clean, updated allArticles.js
 */

const fixArticles = async () => {
  console.log('\n' + '='.repeat(80));
  console.log('🔧 COMPLETE ARTICLE FIX - DEDUPLICATION & IMAGE LINKING');
  console.log('='.repeat(80) + '\n');

  try {
    // Read the current allArticles.js file
    const filePath = path.join(process.cwd(), 'allArticles.js');
    
    if (!fs.existsSync(filePath)) {
      console.error('❌ allArticles.js not found');
      console.error('   Make sure you run this script from the backend directory');
      process.exit(1);
    }

    console.log('📖 Reading allArticles.js...');
    const content = fs.readFileSync(filePath, 'utf8');

    // Import the articles dynamically
    const { default: allArticles } = await import(`file://${filePath}`);
    
    console.log(`📊 Total articles found: ${allArticles.length}\n`);

    // STEP 1: DEDUPLICATE BY SLUG
    console.log('🔍 Step 1: Deduplicating articles...\n');
    
    const seen = new Set();
    const uniqueArticles = [];
    const duplicates = [];

    allArticles.forEach((article, index) => {
      if (!article.slug) {
        console.warn(`⚠️  Article at index ${index} has no slug: ${article.title}`);
        return;
      }

      if (seen.has(article.slug)) {
        duplicates.push({
          slug: article.slug,
          title: article.title,
          index,
          publishDate: article.publishDate
        });
      } else {
        seen.add(article.slug);
        uniqueArticles.push(article);
      }
    });

    console.log('📊 Deduplication Results:');
    console.log(`   ✅ Unique articles: ${uniqueArticles.length}`);
    console.log(`   ❌ Duplicates found: ${duplicates.length}\n`);

    if (duplicates.length > 0) {
      console.log('📋 Duplicate articles removed:\n');
      duplicates.slice(0, 10).forEach((dup, idx) => {
        console.log(`   ${idx + 1}. ${dup.title}`);
        console.log(`      Slug: ${dup.slug}`);
        console.log(`      Date: ${new Date(dup.publishDate).toLocaleDateString()}\n`);
      });
      
      if (duplicates.length > 10) {
        console.log(`   ... and ${duplicates.length - 10} more\n`);
      }
    }

    // STEP 2: VALIDATE AND FIX IMAGE URLS
    console.log('🖼️  Step 2: Validating image URLs...\n');
    
    let validCloudinary = 0;
    let fixedImages = 0;
    let missingImages = 0;
    let invalidImages = [];

    const cloudinaryBase = 'https://res.cloudinary.com/dyftyrehc/image/upload/';
    const defaultImage = `${cloudinaryBase}v1770720000/nmai-articles/default.jpg`;

    uniqueArticles.forEach((article) => {
      const imageUrl = article.featuredImage?.url;

      if (!imageUrl) {
        // No image - assign default
        article.featuredImage = {
          url: defaultImage,
          alt: article.title,
          cloudinaryId: 'nmai-articles/default'
        };
        missingImages++;
      } else if (imageUrl.includes('cloudinary.com')) {
        // Already valid Cloudinary URL
        validCloudinary++;
      } else if (imageUrl.startsWith('/images/') || imageUrl.startsWith('images/')) {
        // Local path - needs fixing
        const filename = imageUrl.split('/').pop();
        const newUrl = `${cloudinaryBase}v1770720000/nmai-articles/${filename}`;
        
        article.featuredImage = {
          url: newUrl,
          alt: article.featuredImage?.alt || article.title,
          cloudinaryId: `nmai-articles/${filename}`
        };
        fixedImages++;
      } else {
        // Invalid URL format
        invalidImages.push({
          title: article.title,
          url: imageUrl
        });
        
        // Assign default for now
        article.featuredImage = {
          url: defaultImage,
          alt: article.title,
          cloudinaryId: 'nmai-articles/default'
        };
      }
    });

    console.log('📊 Image Validation Results:');
    console.log(`   ✅ Valid Cloudinary URLs: ${validCloudinary}`);
    console.log(`   🔧 Fixed local paths: ${fixedImages}`);
    console.log(`   ➕ Missing images (assigned default): ${missingImages}`);
    console.log(`   ⚠️  Invalid URLs (assigned default): ${invalidImages.length}\n`);

    if (invalidImages.length > 0) {
      console.log('⚠️  Invalid image URLs found:\n');
      invalidImages.slice(0, 5).forEach((item, idx) => {
        console.log(`   ${idx + 1}. ${item.title}`);
        console.log(`      Invalid URL: ${item.url}\n`);
      });
    }

    // STEP 3: VALIDATE DATA INTEGRITY
    console.log('✅ Step 3: Validating data integrity...\n');
    
    let issuesFixed = 0;
    
    uniqueArticles.forEach((article) => {
      // Ensure all required fields exist
      if (!article.slug) {
        article.slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        issuesFixed++;
      }
      
      if (!article.summary) {
        article.summary = article.content?.substring(0, 150) + '...' || 'No summary available';
        issuesFixed++;
      }
      
      if (!article.category) {
        article.category = 'General';
        issuesFixed++;
      }
      
      if (!article.examRelevance) {
        article.examRelevance = ['General Knowledge'];
        issuesFixed++;
      }
      
      if (!article.tags || article.tags.length === 0) {
        article.tags = ['India', 'Current Affairs'];
        issuesFixed++;
      }
      
      if (!article.publishDate) {
        article.publishDate = new Date('2026-02-10');
        issuesFixed++;
      }
    });

    console.log(`   ✅ Fixed ${issuesFixed} data integrity issues\n`);

    // STEP 4: SORT ARTICLES BY DATE (NEWEST FIRST)
    console.log('📅 Step 4: Sorting articles by date...\n');
    
    uniqueArticles.sort((a, b) => {
      return new Date(b.publishDate) - new Date(a.publishDate);
    });

    // STEP 5: CREATE BACKUP
    console.log('💾 Step 5: Creating backup...\n');
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(process.cwd(), `allArticles.backup.${timestamp}.js`);
    
    fs.copyFileSync(filePath, backupPath);
    console.log(`   ✅ Backup created: ${path.basename(backupPath)}\n`);

    // STEP 6: GENERATE NEW FILE
    console.log('📝 Step 6: Generating new allArticles.js...\n');
    
    const newContent = `/* ==========================================================================
   UPDATED: ${new Date().toISOString()}
   - Removed ${duplicates.length} duplicate articles
   - Fixed ${fixedImages} image URLs
   - Validated all ${uniqueArticles.length} articles
   ========================================================================== */

// Date helper: Returns date based on page number (Feb 10, 2026 going backwards)
const getArticleDate = (pageNumber) => {
  const baseDate = new Date('2026-02-10');
  const daysToSubtract = pageNumber - 1;
  const articleDate = new Date(baseDate);
  articleDate.setDate(articleDate.getDate() - daysToSubtract);
  return articleDate;
};

/* ================= TAGS ================= */

const TAGS = {
  Economy: ["UPSC", "RBI", "Trade", "Growth"],
  Polity: ["Constitution", "Governance", "Federalism"],
  Science: ["Research", "Innovation", "Space"],
  Technology: ["AI", "Digital India"],
  Environment: ["Climate Change", "Biodiversity"],
  International: ["Diplomacy", "Geopolitics"],
  Social: ["Health", "Welfare"],
  Defence: ["Security", "Military"],
  Sports: ["Championship", "India"],
  Culture: ["Heritage", "Awards"],
  Geography: ["Disaster Management"],
  Health: ["Public Health"],
  Education: ["Institutions"],
  Energy: ["Renewables"],
  Infrastructure: ["Transport"],
  ExamUtility: ["UPSC", "SSC"]
};

/* ================= ALL ARTICLES ================= */

const allArticles = ${JSON.stringify(uniqueArticles, null, 2)};

export default allArticles;
`;

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('   ✅ New allArticles.js created\n');

    // STEP 7: GENERATE SUMMARY REPORT
    console.log('='.repeat(80));
    console.log('📊 FINAL SUMMARY REPORT');
    console.log('='.repeat(80));
    console.log(`✅ Original articles: ${allArticles.length}`);
    console.log(`✅ Unique articles: ${uniqueArticles.length}`);
    console.log(`❌ Duplicates removed: ${duplicates.length}`);
    console.log(`🖼️  Valid Cloudinary images: ${validCloudinary}`);
    console.log(`🔧 Fixed image URLs: ${fixedImages}`);
    console.log(`➕ Assigned default images: ${missingImages + invalidImages.length}`);
    console.log(`✅ Data integrity fixes: ${issuesFixed}`);
    console.log('='.repeat(80));

    // Show date distribution
    console.log('\n📅 Article Distribution by Date:\n');
    
    const dateGroups = {};
    uniqueArticles.forEach((article) => {
      const date = new Date(article.publishDate).toDateString();
      dateGroups[date] = (dateGroups[date] || 0) + 1;
    });

    const sortedDates = Object.entries(dateGroups)
      .sort((a, b) => new Date(b[0]) - new Date(a[0]))
      .slice(0, 15);

    sortedDates.forEach(([date, count], idx) => {
      const today = new Date('2026-02-10').toDateString();
      const indicator = date === today ? ' 👈 TODAY' : '';
      console.log(`   ${idx + 1}. ${date}: ${count} articles${indicator}`);
    });

    // Next steps
    console.log('\n' + '='.repeat(80));
    console.log('💡 NEXT STEPS');
    console.log('='.repeat(80));
    console.log('1. Review the changes in allArticles.js');
    console.log('2. Run: node seedArticles.js');
    console.log('3. Restart your backend server');
    console.log('4. Clear browser cache (Ctrl + Shift + R)');
    console.log('5. Verify images are loading correctly on your website');
    console.log('='.repeat(80));

    console.log('\n✅ Article fix completed successfully!\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

// Run the fix
fixArticles();