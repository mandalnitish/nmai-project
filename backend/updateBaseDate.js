/**
 * UPDATE BASE DATE IN allArticles.js
 * 
 * This script updates the base date for article generation.
 * Run this whenever you want to update the "today" date for new articles.
 * 
 * IMPORTANT: This only affects NEW articles. Existing articles in the database
 * will keep their original dates, views, likes, etc.
 */

import fs from 'fs';
import path from 'path';

const updateBaseDate = () => {
  const filePath = './allArticles.js';
  
  try {
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    console.log(`📅 Updating base date to: ${todayStr}`);
    
    // Find and replace the base date
    const oldDatePattern = /const baseDate = new Date\('(\d{4}-\d{2}-\d{2})'\);/;
    const match = content.match(oldDatePattern);
    
    if (!match) {
      console.error('❌ Could not find base date pattern in file');
      process.exit(1);
    }
    
    const oldDate = match[1];
    console.log(`📆 Old base date: ${oldDate}`);
    
    // Replace with new date
    content = content.replace(
      oldDatePattern,
      `const baseDate = new Date('${todayStr}');`
    );
    
    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log(`✅ Successfully updated base date from ${oldDate} to ${todayStr}`);
    console.log(`📝 File updated: ${filePath}`);
    console.log(`\n⚠️  IMPORTANT: Run 'node seedArticles.js' to apply changes to database`);
    
  } catch (error) {
    console.error('❌ Error updating file:', error.message);
    process.exit(1);
  }
};

// Run the update
updateBaseDate();