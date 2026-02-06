/* ==========================================================================
   DATABASE SEEDING SCRIPT - 1000 ARTICLES
   Run: node seedDatabase.js
   ========================================================================== */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Article from './models/Article.js';

// Load environment variables
dotenv.config();

/* ================= HELPER FUNCTIONS ================= */
const daysAgo = (n) => {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return date;
};

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

/* ================= CATEGORIES & DATA ================= */
const CATEGORIES = {
  Economy: ["Budget", "GDP", "RBI", "Fiscal Policy", "Banking", "Trade", "Inflation", "UPSC"],
  Polity: ["Constitution", "Supreme Court", "Governance", "Rights", "Parliament", "Federalism"],
  Science: ["ISRO", "Research", "Innovation", "Space", "Biotechnology", "DRDO"],
  Technology: ["AI", "Digital India", "Cyber Security", "5G", "Blockchain", "IoT"],
  Environment: ["Climate Change", "Renewables", "Sustainability", "Wildlife", "Pollution"],
  International: ["Diplomacy", "Global Summit", "Geopolitics", "UN", "Trade", "BRICS"],
  Social: ["Education", "Health", "Women", "Welfare", "Employment", "Poverty"],
  Defence: ["Military", "Indigenous Defence", "Security", "Border", "Navy", "Air Force"],
  History: ["Ancient India", "Medieval India", "Modern India", "Freedom Struggle", "Culture"],
  Geography: ["Physical Geography", "Human Geography", "Resources", "Regions", "Disaster Management"]
};

const EXAM_RELEVANCE = ["UPSC", "SSC", "Banking", "Railways", "State PSC", "Defence", "Judiciary", "Engineering"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

const TOPIC_TEMPLATES = {
  Economy: [
    "Budget Analysis", "Monetary Policy", "GST Updates", "Banking Reforms", "Trade Policy",
    "FDI Regulations", "Cryptocurrency", "Stock Market", "Fiscal Deficit", "Inflation Control",
    "MSMEs Growth", "Startup Ecosystem", "Digital Economy", "Agricultural Credit", "Export Promotion",
    "Infrastructure Finance", "Public Debt", "Taxation Policy", "Financial Inclusion", "Green Finance",
    "Sovereign Bonds", "Corporate Governance", "Insolvency Framework", "Capital Markets", "Rural Banking",
    "Cooperative Banking", "NBFCs Regulation", "Payment Systems", "Fintech Innovation", "Economic Indicators"
  ],
  
  Polity: [
    "Constitutional Amendments", "Judicial Review", "Fundamental Rights", "Directive Principles", "Emergency Provisions",
    "Parliamentary System", "Federal Structure", "Local Governance", "Election Laws", "Political Parties",
    "Anti-Defection Law", "Governor's Powers", "President's Rule", "Supreme Court Judgments", "High Court Functions",
    "Tribunals System", "Public Interest Litigation", "Right to Information", "Whistleblower Protection", "Lokpal",
    "Central Vigilance", "Election Commission", "CAG Reports", "UPSC Functions", "Union Public Service",
    "State Reorganization", "Inter-State Relations", "Centre-State Disputes", "Finance Commission", "GST Council"
  ],
  
  Science: [
    "ISRO Missions", "Space Technology", "Satellite Launch", "Mars Mission", "Lunar Exploration",
    "Scientific Research", "Biotechnology", "Genetic Engineering", "Stem Cell Research", "Drug Development",
    "Medical Innovation", "Healthcare Tech", "Diagnostic Methods", "Vaccine Development", "Disease Control",
    "Nuclear Technology", "Particle Physics", "Quantum Computing", "Material Science", "Nanotechnology",
    "Robotics", "Artificial Intelligence", "Machine Learning", "Data Science", "Computational Biology",
    "Climate Science", "Oceanography", "Meteorology", "Astronomy", "Astrophysics"
  ],
  
  Technology: [
    "5G Rollout", "6G Research", "Internet of Things", "Cloud Computing", "Edge Computing",
    "Artificial Intelligence", "Machine Learning", "Deep Learning", "Neural Networks", "Computer Vision",
    "Natural Language", "Blockchain", "Cryptocurrency", "Smart Contracts", "Digital Currency",
    "Cybersecurity", "Data Protection", "Privacy Laws", "Encryption", "Network Security",
    "Software Development", "Programming Languages", "Web Technologies", "Mobile Apps", "API Development",
    "Database Systems", "Big Data", "Data Analytics", "Business Intelligence", "Predictive Analytics"
  ],
  
  Environment: [
    "Climate Change", "Global Warming", "Carbon Emissions", "Net Zero Targets", "Paris Agreement",
    "Renewable Energy", "Solar Power", "Wind Energy", "Hydroelectric", "Biomass Energy",
    "Green Hydrogen", "Energy Storage", "Battery Technology", "Electric Vehicles", "Sustainable Transport",
    "Forest Conservation", "Afforestation", "Deforestation", "Wildlife Protection", "Biodiversity",
    "Marine Conservation", "Coral Reefs", "Ocean Pollution", "Coastal Zones", "Wetlands",
    "Air Quality", "Pollution Control", "Water Conservation", "River Cleaning", "Groundwater"
  ],
  
  International: [
    "UN Initiatives", "G20 Summit", "BRICS Cooperation", "SAARC Relations", "ASEAN Partnership",
    "India-USA Relations", "India-China Border", "India-Pakistan Issues", "India-Russia Ties", "India-EU Trade",
    "Middle East Policy", "Africa Partnership", "Latin America Ties", "Indo-Pacific Strategy", "Quad Alliance",
    "SCO Membership", "BIMSTEC Forum", "Climate Diplomacy", "Trade Agreements", "FTA Negotiations",
    "Nuclear Non-Proliferation", "Disarmament Talks", "Space Cooperation", "Vaccine Diplomacy", "Digital Diplomacy",
    "Cultural Exchange", "Educational Cooperation", "Health Partnerships", "Counter-Terrorism", "Cyber Security"
  ],
  
  Social: [
    "Education Policy", "School Reforms", "Higher Education", "Skill Development", "Vocational Training",
    "Scholarship Programs", "Digital Learning", "Online Education", "Teacher Training", "Literacy Programs",
    "Health Initiatives", "Universal Healthcare", "Ayushman Bharat", "Immunization", "Maternal Health",
    "Child Nutrition", "Disease Eradication", "Mental Health", "AYUSH Integration", "Traditional Medicine",
    "Women Empowerment", "Gender Equality", "Women Safety", "Women Employment", "Women Entrepreneurship",
    "Child Welfare", "Child Protection", "Adoption", "Juvenile Justice", "Child Rights"
  ],
  
  Defence: [
    "Indigenous Defence", "Make in India Defence", "Defense Procurement", "Military Modernization", "Weapon Systems",
    "Fighter Aircraft", "Combat Helicopters", "Transport Aircraft", "Naval Ships", "Submarines",
    "Aircraft Carriers", "Missile Systems", "Ballistic Missiles", "Cruise Missiles", "Air Defense",
    "Artillery Systems", "Armored Vehicles", "Infantry Weapons", "Special Forces", "Cyber Warfare",
    "Space Warfare", "Electronic Warfare", "Intelligence Operations", "Border Security", "Coastal Defense",
    "Counter-Terrorism", "Internal Security", "Military Training", "Defense Exercises", "Strategic Partnerships"
  ],
  
  History: [
    "Ancient Civilizations", "Indus Valley", "Vedic Period", "Mauryan Empire", "Gupta Dynasty",
    "Medieval India", "Delhi Sultanate", "Mughal Empire", "Maratha Power", "Sikh Empire",
    "Colonial Period", "British Rule", "East India Company", "1857 Revolt", "Freedom Movement",
    "Congress Formation", "Revolutionary Movement", "Gandhi Era", "Quit India", "Independence",
    "Partition", "Integration", "Constitution Making", "Republic Day", "Post-Independence",
    "Five Year Plans", "Green Revolution", "White Revolution", "Emergency Period", "Liberalization"
  ],
  
  Geography: [
    "Physical Features", "Himalayas", "Northern Plains", "Peninsular Plateau", "Coastal Plains",
    "Islands", "Drainage System", "Rivers", "Lakes", "Glaciers",
    "Climate Zones", "Monsoon", "Rainfall Patterns", "Temperature", "Weather Systems",
    "Natural Vegetation", "Forests", "Grasslands", "Deserts", "Wetlands",
    "Soil Types", "Soil Conservation", "Land Degradation", "Soil Erosion", "Watershed Management",
    "Mineral Resources", "Coal", "Iron Ore", "Petroleum", "Natural Gas"
  ]
};

/* ================= CONTENT GENERATOR ================= */
const generateContent = (category, topic) => {
  return `
<h2>${topic}</h2>

<h3>Overview</h3>
<p>${topic} is a crucial aspect of ${category} that has significant implications for India's development trajectory. This comprehensive analysis covers all dimensions relevant for competitive examinations including UPSC, SSC, Banking, and State PSCs.</p>

<h3>Key Features</h3>
<ul>
  <li><strong>Context:</strong> Understanding the background and evolution of ${topic} in the Indian context</li>
  <li><strong>Current Status:</strong> Latest developments and policy changes as of 2024-2026</li>
  <li><strong>Implementation:</strong> How ${topic} is being executed at various levels of governance</li>
  <li><strong>Stakeholders:</strong> Key players involved including government agencies, private sector, and civil society</li>
</ul>

<h3>Significance for India</h3>
<p>The importance of ${topic} in India's ${category.toLowerCase()} landscape plays a vital role in economic growth, social welfare, environmental sustainability, and international competitiveness.</p>

<h3>Recent Developments (2024-2026)</h3>
<ul>
  <li>Policy reforms and new initiatives launched by the government</li>
  <li>Technological interventions and digital transformation</li>
  <li>International collaborations and partnerships</li>
  <li>Budget allocations and financial provisions</li>
</ul>

<h3>Challenges and Way Forward</h3>
<p>Key challenges include implementation gaps, resource constraints, coordination issues, and technology adoption barriers. The way forward involves strengthening institutional capacity, enhancing financial allocations, and promoting public-private partnerships.</p>

<h3>Exam Perspective</h3>
<h4>For UPSC Civil Services</h4>
<ul>
  <li><strong>Prelims:</strong> Static and current facts, schemes, committees, reports</li>
  <li><strong>Mains:</strong> Analytical questions on policy impact, challenges, suggestions</li>
  <li><strong>Interview:</strong> Opinion-based questions on contemporary issues</li>
</ul>

<h3>Practice Questions</h3>
<ol>
  <li>Discuss the significance of ${topic} in the context of India's development goals.</li>
  <li>Analyze the major challenges in implementing ${topic} and suggest remedial measures.</li>
  <li>Evaluate the role of technology in transforming ${topic} in recent years.</li>
  <li>Compare India's approach to ${topic} with international best practices.</li>
  <li>What are the key policy interventions needed to strengthen ${topic} in India?</li>
</ol>

<h3>Conclusion</h3>
<p>${topic} represents a critical area in India's ${category.toLowerCase()} domain. A comprehensive understanding of this topic is essential for competitive exam aspirants.</p>
`;
};

/* ================= MAIN SEEDING FUNCTION ================= */
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log('🔄 Connecting to MongoDB...');
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nmai';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing articles
    console.log('🔄 Clearing existing articles...');
    await Article.deleteMany({});
    console.log('✅ Cleared existing articles');

    // Generate author ID (single author for simplicity)
    const authorId = new mongoose.Types.ObjectId();

    // Generate articles
    console.log('🔄 Generating 1000 articles...');
    const articles = [];
    let articleId = 1;
    
    const categoriesArray = Object.keys(CATEGORIES);
    const articlesPerCategory = Math.floor(1000 / categoriesArray.length);
    
    // Generate articles for each category
    for (const category of categoriesArray) {
      const topics = TOPIC_TEMPLATES[category];
      
      for (let i = 0; i < articlesPerCategory && articleId <= 1000; i++) {
        const topicIndex = i % topics.length;
        const topic = topics[topicIndex];
        
        const title = `${topic} - ${category} Analysis for Competitive Exams`;
        const slug = generateSlug(`${topic}-${category}-analysis-${articleId}`);
        
        const viewCount = randomInt(1000, 15000);
        const likes = Math.floor(viewCount * randomInt(5, 15) / 100);
        const daysBack = randomInt(1, 365);
        
        articles.push({
          title,
          slug,
          summary: `Comprehensive coverage of ${topic} in ${category}. Includes latest updates, policy changes, challenges, and exam-focused analysis for UPSC, SSC, Banking, and State PSC aspirants.`,
          content: generateContent(category, topic),
          category,
          tags: CATEGORIES[category].slice(0, randomInt(3, 5)),
          examRelevance: EXAM_RELEVANCE.slice(0, randomInt(2, 4)),
          publishDate: daysAgo(daysBack),
          status: 'published',
          isPremium: randomInt(1, 10) > 8,
          viewCount,
          likes,
          readingTime: `${randomInt(5, 12)} min`,
          difficulty: DIFFICULTIES[articleId % 3],
          sources: [
            'Government Official Portal',
            'Ministry Reports',
            'PIB Press Releases'
          ],
          isActive: true,
          author: authorId,
          featuredImage: {
            url: `https://source.unsplash.com/random/800x400?${category.toLowerCase()},india`,
            alt: title
          }
        });
        
        articleId++;
      }
    }
    
    // Fill remaining articles to reach exactly 1000
    while (articleId <= 1000) {
      const category = categoriesArray[(articleId - 1) % categoriesArray.length];
      const topics = TOPIC_TEMPLATES[category];
      const topic = topics[(articleId - 1) % topics.length];
      
      const title = `${topic} - ${category} Update ${articleId}`;
      const slug = generateSlug(`${topic}-${category}-${articleId}`);
      
      const viewCount = randomInt(1000, 15000);
      const likes = Math.floor(viewCount * randomInt(5, 15) / 100);
      
      articles.push({
        title,
        slug,
        summary: `Latest analysis of ${topic} in ${category} context. Essential reading for competitive exam aspirants.`,
        content: generateContent(category, topic),
        category,
        tags: CATEGORIES[category].slice(0, randomInt(3, 5)),
        examRelevance: EXAM_RELEVANCE.slice(0, randomInt(2, 4)),
        publishDate: daysAgo(randomInt(1, 365)),
        status: 'published',
        isPremium: randomInt(1, 10) > 8,
        viewCount,
        likes,
        readingTime: `${randomInt(5, 12)} min`,
        difficulty: DIFFICULTIES[(articleId - 1) % 3],
        sources: ['Government Portal', 'Ministry Reports'],
        isActive: true,
        author: authorId,
        featuredImage: {
          url: `https://source.unsplash.com/random/800x400?${category.toLowerCase()},india`,
          alt: title
        }
      });
      
      articleId++;
    }

    console.log(`📝 Generated ${articles.length} articles`);

    // Insert articles in batches
    const batchSize = 50;
    let insertedCount = 0;
    
    console.log('🔄 Inserting articles into database...');
    
    for (let i = 0; i < articles.length; i += batchSize) {
      const batch = articles.slice(i, i + batchSize);
      
      try {
        await Article.insertMany(batch, { ordered: false });
        insertedCount += batch.length;
        console.log(`✅ Inserted ${insertedCount}/${articles.length} articles`);
      } catch (error) {
        if (error.writeErrors) {
          const successCount = error.insertedDocs?.length || 0;
          insertedCount += successCount;
          console.log(`⚠️  Batch partially inserted: ${successCount} succeeded`);
        } else {
          console.error(`❌ Batch error:`, error.message);
        }
      }
      
      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Verify the data
    const totalCount = await Article.countDocuments();
    console.log(`\n📊 Total articles in database: ${totalCount}`);

    if (totalCount > 0) {
      // Get sample articles
      const samples = await Article.find()
        .limit(5)
        .select('title slug category viewCount examRelevance')
        .lean();
      
      console.log('\n📋 Sample articles:');
      samples.forEach((article, index) => {
        console.log(`   ${index + 1}. "${article.title.substring(0, 50)}..."`);
        console.log(`      Slug: ${article.slug}`);
        console.log(`      Category: ${article.category} | Views: ${article.viewCount}`);
        console.log(`      Exams: ${article.examRelevance.join(', ')}`);
      });

      // Show category distribution
      console.log('\n📊 Category Distribution:');
      for (const category of categoriesArray) {
        const count = await Article.countDocuments({ category });
        console.log(`   ${category}: ${count} articles`);
      }

      console.log('\n🎉 Database seeding completed successfully!');
      console.log('\n🔗 Test the API:');
      console.log('   • GET /api/articles');
      console.log('   • GET /api/articles?category=Economy');
      console.log('   • GET /api/articles/latest');
      console.log('   • GET /api/articles/trending');
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

// Run the seeding function
seedDatabase();