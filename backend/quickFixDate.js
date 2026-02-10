/**
 * QUICK FIX: Update allArticles.js to use Feb 10, 2026 as base date
 * 
 * This will change line 7 in allArticles.js from:
 * const baseDate = new Date('2026-02-09');
 * to:
 * const baseDate = new Date('2026-02-10');
 */

import fs from 'fs';

const quickFix = () => {
  const filePath = './allArticles.js';
  
  try {
    console.log('📝 Reading allArticles.js...');
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check current date
    const currentMatch = content.match(/const baseDate = new Date\('(\d{4}-\d{2}-\d{2})'\);/);
    if (!currentMatch) {
      console.error('❌ Could not find date pattern in file');
      process.exit(1);
    }
    
    const currentDate = currentMatch[1];
    console.log(`📅 Current base date: ${currentDate}`);
    
    // Update to Feb 10, 2026
    const newDate = '2026-02-10';
    
    if (currentDate === newDate) {
      console.log(`✅ Already up to date! Base date is ${newDate}`);
      process.exit(0);
    }
    
    content = content.replace(
      /const baseDate = new Date\('2026-02-09'\);/,
      `const baseDate = new Date('2026-02-10');`
    );
    
    // Write back
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log(`✅ Updated base date from ${currentDate} to ${newDate}`);
    console.log(`\n📋 Next steps:`);
    console.log(`   1. Run: node seedArticles.js`);
    console.log(`   2. Check your website - new articles should show Feb 10`);
    console.log(`   3. Old articles will keep their original dates and view counts`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

quickFix();