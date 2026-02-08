/* ==========================================================================
   CURRENT AFFAIRS ARTICLE SEED DATA - ENHANCED VERSION
   Easy to customize with your own images and content
   ========================================================================== */

const daysAgo = (n) => new Date(Date.now() - n * 86400000);

/* ==========================================================================
   YOUR CUSTOM ARTICLES
   Add your own articles here with images and content
   ========================================================================== */

const yourArticles = [
  {
    title: "Your Article Title Here",
    slug: "your-article-slug",  // URL-friendly version of title
    summary: "Brief 2-3 line summary of your article for preview cards",
    
    // Full HTML content - you can use rich formatting
    content: `
      <h2>Introduction</h2>
      <p>Your introduction paragraph here...</p>

      <h2>Main Section 1</h2>
      <p>Your content here...</p>
      <ul>
        <li>Point 1</li>
        <li>Point 2</li>
        <li>Point 3</li>
      </ul>

      <h2>Main Section 2</h2>
      <p>More detailed content...</p>

      <h3>Subsection</h3>
      <p>Additional details...</p>

      <h2>Conclusion</h2>
      <p>Wrap up your article...</p>

      <h3>Practice Questions</h3>
      <ol>
        <li>Question 1 for exam preparation?</li>
        <li>Question 2 for discussion?</li>
        <li>Question 3 for analysis?</li>
      </ol>
    `,
    
    category: "Economy",  // Choose from: Economy, Polity, Science, Technology, Environment, International, Social, Defence, History, Geography
    
    tags: ["Budget", "GDP", "UPSC"],  // Add relevant tags (max 5)
    
    // FEATURED IMAGE - Multiple options:
    featuredImage: {
      // OPTION 1: Use your own hosted image
      url: "https://yourdomain.com/images/article-image.jpg",
      alt: "Description of the image"
      
      // OPTION 2: Use Unsplash (free stock photos)
      // url: "https://source.unsplash.com/random/800x400?economy,india",
      // alt: "Economy related image"
      
      // OPTION 3: Use a specific Unsplash photo
      // url: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop",
      // alt: "Business meeting"
      
      // OPTION 4: Use placeholder
      // url: "https://via.placeholder.com/800x400/4F46E5/ffffff?text=Your+Article",
      // alt: "Article placeholder"
    },
    
    publishDate: daysAgo(0),  // Today (0 = today, 1 = yesterday, etc.)
    lastUpdated: daysAgo(0),
    readingTime: "8 min",
    author: "Your Name",
    examRelevance: ["UPSC", "SSC", "Banking"],  // Choose from: UPSC, SSC, Banking, Railways, State PSC, Defence, Judiciary, Engineering
    difficulty: "Intermediate",  // Beginner, Intermediate, or Advanced
    sources: ["Government Reports", "Research Papers", "Official Data"],
    viewCount: 1200,  // Initial view count
    likes: 85  // Initial likes
  },

  // Add more articles below - just copy the template above
  {
    title: "Another Article Example",
    slug: "another-article-example",
    summary: "This is another example showing how to add multiple articles",
    content: `
      <h2>Example Content</h2>
      <p>This shows you can add as many articles as you want...</p>
    `,
    category: "Technology",
    tags: ["AI", "Digital India", "Innovation"],
    featuredImage: {
      url: "https://source.unsplash.com/random/800x400?technology,india",
      alt: "Technology innovation"
    },
    publishDate: daysAgo(1),
    lastUpdated: daysAgo(1),
    readingTime: "5 min",
    author: "Tech Team",
    examRelevance: ["UPSC", "SSC"],
    difficulty: "Beginner",
    sources: ["Tech Reports", "Industry Analysis"],
    viewCount: 0,
    likes: 0
  }
];


/* ==========================================================================
   PRE-BUILT SAMPLE ARTICLES (You can keep or remove these)
   ========================================================================== */

const CATEGORIES = [
  "Economy", "Polity", "Science", "Technology", "Environment",
  "International", "Social", "Defence", "History", "Geography"
];

const TAGS = {
  Economy: ["Budget", "GDP", "RBI", "Fiscal Policy", "UPSC", "Banking", "Trade", "Inflation"],
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

const sampleArticles = [
  {
    title: "Union Budget 2026 – Complete Analysis",
    slug: "union-budget-2026-complete-analysis",
    summary: "Detailed analysis of Union Budget 2026 with sector-wise impact.",
    content: `
      <h2>Overview</h2>
      <p>The Union Budget 2026 focuses on fiscal consolidation, infrastructure expansion, and inclusive growth while maintaining macroeconomic stability.</p>

      <h2>Key Announcements</h2>
      <ul>
        <li>Capital expenditure increased by 11%</li>
        <li>Major push to railways, highways, and logistics</li>
        <li>Tax incentives for startups and MSMEs</li>
        <li>Digital public infrastructure expansion</li>
      </ul>

      <h2>Sector-wise Impact</h2>
      <p><strong>Agriculture:</strong> Increased allocation for irrigation, agri-tech, and MSP support.</p>
      <p><strong>Education:</strong> AI labs in universities, skill-based programs.</p>
      <p><strong>Health:</strong> Expansion of digital health mission and medical colleges.</p>

      <h3>Practice Questions</h3>
      <ol>
        <li>Analyze the key features of Union Budget 2026 and their implications for economic growth.</li>
        <li>How does the budget address the challenges of infrastructure development in India?</li>
      </ol>
    `,
    category: "Economy",
    tags: ["Budget", "Fiscal Policy", "UPSC", "Banking"],
    featuredImage: {
      url: "https://source.unsplash.com/random/800x400?parliament,budget,india",
      alt: "Union Budget 2026"
    },
    publishDate: daysAgo(0),
    lastUpdated: daysAgo(0),
    readingTime: "8 min",
    author: "Economic Analysis Team",
    examRelevance: ["UPSC", "SSC", "Banking"],
    difficulty: "Intermediate",
    sources: ["Economic Survey 2025-26", "Budget Documents"],
    viewCount: 12500,
    likes: 845
  },

  {
    title: "RBI Monetary Policy 2026 Explained",
    slug: "rbi-monetary-policy-2026",
    summary: "Latest RBI policy decisions and implications for the economy.",
    content: `
      <h2>Policy Highlights</h2>
      <p>The RBI maintained a calibrated tightening stance focusing on inflation targeting.</p>

      <h2>Repo Rate</h2>
      <p>Repo rate remains unchanged at 6.5% to balance growth and inflation.</p>

      <h3>Practice Questions</h3>
      <ol>
        <li>Analyze the RBI's monetary policy stance and its impact on economic growth.</li>
        <li>Discuss the challenges faced by RBI in managing inflation.</li>
      </ol>
    `,
    category: "Economy",
    tags: ["RBI", "Monetary Policy", "Banking"],
    featuredImage: {
      url: "https://source.unsplash.com/random/800x400?banking,finance,india",
      alt: "RBI Monetary Policy"
    },
    publishDate: daysAgo(1),
    lastUpdated: daysAgo(1),
    readingTime: "6 min",
    author: "Banking Expert",
    examRelevance: ["UPSC", "Banking"],
    difficulty: "Intermediate",
    sources: ["RBI Bulletin", "Monetary Policy Report"],
    viewCount: 9800,
    likes: 720
  }
];

/* ==========================================================================
   COMBINE ALL ARTICLES
   ========================================================================== */

// Merge your articles with sample articles
// Your articles will appear first
const allArticles = [...yourArticles, ...sampleArticles];

/* ==========================================================================
   UTILITY FUNCTIONS
   ========================================================================== */

const getArticlesByCategory = (category) => 
  allArticles.filter(article => article.category === category);

const getArticlesByTag = (tag) => 
  allArticles.filter(article => article.tags.includes(tag));

const searchArticles = (query) => 
  allArticles.filter(article => 
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.summary.toLowerCase().includes(query.toLowerCase())
  );

const getRecentArticles = (count = 10) => 
  allArticles
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, count);

const getArticleBySlug = (slug) => 
  allArticles.find(article => article.slug === slug);

/* ==========================================================================
   EXPORT
   ========================================================================== */

export default allArticles;

export {
  yourArticles,
  sampleArticles,
  getArticlesByCategory,
  getArticlesByTag,
  searchArticles,
  getRecentArticles,
  getArticleBySlug,
  CATEGORIES,
  TAGS,
  daysAgo
};