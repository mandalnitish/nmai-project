// scripts/deduplicateArticles.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Deduplicate articles from allArticles.js
 * Remove duplicate articles by slug
 */
const deduplicateArticles = () => {
  console.log('\n🔍 Deduplicating articles...\n');
  
  try {
    // Read allArticles.js
    const filePath = path.join(__dirname, '../allArticles.js');
    
    if (!fs.existsSync(filePath)) {
      console.error('❌ allArticles.js not found');
      return;
    }
    
    // Import the file
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract array content (handle both default export and named export)
    let articlesArray;
    
    // Try to parse as module
    try {
      // Create temporary file
      const tempPath = path.join(__dirname, '../temp-articles.js');
      fs.writeFileSync(tempPath, content);
      
      // Dynamic import doesn't work here, so we'll parse manually
      // Look for the array definition
      const arrayMatch = content.match(/(?:const|let|var)\s+\w+\s*=\s*(\[[\s\S]*\]);/);
      
      if (!arrayMatch) {
        console.error('❌ Could not find articles array in file');
        return;
      }
      
      // Use eval (dangerous but controlled environment)
      articlesArray = eval(arrayMatch[1]);
      
      console.log(`📊 Total articles found: ${articlesArray.length}`);
      
      // Deduplicate by slug
      const seen = new Set();
      const uniqueArticles = [];
      const duplicates = [];
      
      articlesArray.forEach((article, index) => {
        if (!article.slug) {
          console.warn(`⚠️  Article at index ${index} has no slug:`, article.title);
          return;
        }
        
        if (seen.has(article.slug)) {
          duplicates.push({
            slug: article.slug,
            title: article.title,
            index
          });
        } else {
          seen.add(article.slug);
          uniqueArticles.push(article);
        }
      });
      
      console.log('\n' + '='.repeat(80));
      console.log('📊 DEDUPLICATION RESULTS');
      console.log('='.repeat(80));
      console.log(`Total articles: ${articlesArray.length}`);
      console.log(`Unique articles: ${uniqueArticles.length}`);
      console.log(`Duplicates removed: ${duplicates.length}`);
      console.log('='.repeat(80));
      
      if (duplicates.length > 0) {
        console.log('\n🔄 Duplicate articles found:\n');
        duplicates.forEach((dup, idx) => {
          console.log(`${idx + 1}. ${dup.title}`);
          console.log(`   Slug: ${dup.slug}`);
          console.log(`   Index: ${dup.index}\n`);
        });
        
        // Create backup
        const backupPath = path.join(__dirname, '../allArticles.backup.js');
        fs.copyFileSync(filePath, backupPath);
        console.log(`💾 Backup created: ${backupPath}\n`);
        
        // Write deduplicated version
        const newContent = `// Deduplicated articles - ${new Date().toISOString()}
const allArticles = ${JSON.stringify(uniqueArticles, null, 2)};

export default allArticles;
`;
        
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log('✅ allArticles.js updated with unique articles only\n');
        
        // Validate image URLs
        console.log('🖼️  Validating image URLs...\n');
        
        let validImages = 0;
        let invalidImages = 0;
        let missingImages = 0;
        
        uniqueArticles.forEach((article) => {
          const imageUrl = article.featuredImage?.url;
          
          if (!imageUrl) {
            missingImages++;
          } else if (imageUrl.includes('cloudinary.com')) {
            validImages++;
          } else {
            invalidImages++;
            console.warn(`⚠️  Non-Cloudinary URL: ${article.title}`);
            console.warn(`   URL: ${imageUrl.substring(0, 80)}...\n`);
          }
        });
        
        console.log('='.repeat(80));
        console.log('🖼️  IMAGE URL VALIDATION');
        console.log('='.repeat(80));
        console.log(`✅ Valid Cloudinary URLs: ${validImages}`);
        console.log(`⚠️  Invalid/Local URLs: ${invalidImages}`);
        console.log(`❌ Missing images: ${missingImages}`);
        console.log('='.repeat(80));
        
      } else {
        console.log('\n✅ No duplicates found! Your articles are already unique.\n');
      }
      
      // Show date distribution
      console.log('\n📅 Article Date Distribution:\n');
      
      const dateGroups = {};
      uniqueArticles.forEach((article) => {
        const date = new Date(article.publishDate).toDateString();
        dateGroups[date] = (dateGroups[date] || 0) + 1;
      });
      
      const sortedDates = Object.entries(dateGroups)
        .sort((a, b) => new Date(b[0]) - new Date(a[0]))
        .slice(0, 10);
      
      sortedDates.forEach(([date, count]) => {
        console.log(`${date}: ${count} articles`);
      });
      
      console.log('\n✅ Deduplication complete!\n');
      
    } catch (error) {
      console.error('❌ Error:', error.message);
      console.error(error.stack);
    }
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
  }
};

// Run the script
deduplicateArticles();