// Date helper: Returns date based on page number (Feb 9, 2026 going backwards)
const getArticleDate = (pageNumber) => {
  const baseDate = new Date('2026-02-09');
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

/* ================= ALL 126 ARTICLES WITH PAGE MAPPING ================= */

const ARTICLE_LIST = [
 
  // PAGE 1 (FEB 9, 2026 – LATEST) - Articles 0-23
  { title: "Daily Current Affairs Quiz: February 8–9, 2026", category: "ExamUtility", page: 1, imageName: "quiz-feb-8-9-2026.jpg" },
  { title: "INS Arnala, Anti-Submarine Warfare Shallow Water Craft", category: "Defence", page: 1, imageName: "ins-arnala.jpg" },
  { title: "NSO Launches MCP Server for eSankhyiki Portal", category: "Economy", page: 1, imageName: "nso-mcp-esankhyiki.jpg" },
  { title: "Two New Marine Worm Species Discovered off West Bengal Coast", category: "Environment", page: 1, imageName: "marine-worms-west-bengal.jpg" },
  { title: "INS Arnala Strengthens India's Indigenous Naval Capability", category: "Defence", page: 1, imageName: "ins-arnala-naval.jpg" },
  { title: "World's Longest Snake Recorded in Sulawesi, Indonesia", category: "Environment", page: 1, imageName: "longest-snake-sulawesi.jpg" },
  { title: "New Trapdoor Spider Species Found in Kolhapur Grasslands", category: "Environment", page: 1, imageName: "trapdoor-spider-kolhapur.jpg" },
  { title: "Sharda River Corridor Project Launched in Champawat", category: "Infrastructure", page: 1, imageName: "sharda-river-corridor.jpg" },
  { title: "Centre Plans Comprehensive Development of Kondaveedu Fort", category: "Culture", page: 1, imageName: "kondaveedu-fort.jpg" },
  { title: "India Explores New Kailash Yatra Route via Shipki La Pass", category: "International", page: 1, imageName: "kailash-yatra-shipki-la.jpg" },
  { title: "New Ant Species Discovered in Guwahati's Garbhanga Forest", category: "Environment", page: 1, imageName: "ant-species-guwahati.jpg" },
  { title: "Eurasian Otter Returns to Kashmir via LoC Waterways", category: "Environment", page: 1, imageName: "eurasian-otter-kashmir.jpg" },
  { title: "International Epilepsy Day 2026 Observed Globally", category: "Health", page: 1, imageName: "epilepsy-day-2026.jpg" },
  { title: "India Clinch SAFF U-19 Women's Championship Title", category: "Sports", page: 1, imageName: "saff-u19-women.jpg" },
  { title: "Chess Added to Esports Nations Cup 2026 Line-up", category: "Sports", page: 1, imageName: "chess-esports-nations-cup.jpg" },
  { title: "Wool Production in India: States, Types and Industry Profile", category: "Geography", page: 1, imageName: "wool-production-india.jpg" },
  { title: "Himachal CM Launches 'Padhai with AI' Initiative", category: "Education", page: 1, imageName: "padhai-with-ai.jpg" },
  { title: "Azista Space Achieves India's First In-Orbit Snooping Capability", category: "Science", page: 1, imageName: "azista-space-orbit.jpg" },
  { title: "Anutin Charnvirakul Wins Thailand Snap Election", category: "International", page: 1, imageName: "thailand-election.jpg" },
  { title: "Sanae Takaichi Secures Supermajority in Japan Election", category: "International", page: 1, imageName: "japan-election.jpg" },
  { title: "Arjun Ram Meghwal Launches The Medicolegal Guidebook", category: "Polity", page: 1, imageName: "medicolegal-guidebook.jpg" },
  { title: "Queensland Moves to Ban Pro-Palestinian Slogans", category: "International", page: 1, imageName: "queensland-ban.jpg" },
  { title: "Cardinal Poola Anthony Elected CBCI President", category: "Culture", page: 1, imageName: "cbci-president.jpg" },
  { title: "India Ranks Second Globally in LEED-Certified Green Realty", category: "Environment", page: 1, imageName: "leed-green-realty.jpg" },

  // PAGE 2 (FEB 8) - Articles 24-32
  { title: "Meghana Sajjanar Wins Asian Shooting Championships Bronze", category: "Sports", page: 2, imageName: "meghana-sajjanar-bronze.jpg" },
  { title: "India–US Trade Pact Cuts Duties on Wines and Dry Fruits", category: "Economy", page: 2, imageName: "india-us-trade-pact.jpg" },
  { title: "RSS Flag March from Kashmir to Kanyakumari", category: "Polity", page: 2, imageName: "rss-flag-march.jpg" },
  { title: "Cancer Cells Reprogramme Immune Cells to Aid Tumour Growth", category: "Science", page: 2, imageName: "cancer-cells-research.jpg" },
  { title: "South Africa Launches First Local FMD Vaccine in 20 Years", category: "Science", page: 2, imageName: "south-africa-fmd-vaccine.jpg" },
  { title: "PM Modi Begins Two-Day Official Visit to Malaysia", category: "International", page: 2, imageName: "pm-modi-malaysia.jpg" },
  { title: "India's Forex Reserves Hit Record High", category: "Economy", page: 2, imageName: "forex-reserves.jpg" },
  { title: "US Removes Additional 25% Tariffs on Indian Goods", category: "Economy", page: 2, imageName: "us-tariffs-removal.jpg" },
  { title: "VOC Port Becomes First in India to Deploy Anti-Drone System", category: "Defence", page: 2, imageName: "voc-port-anti-drone.jpg" },

  // PAGE 3 (FEB 7) - Articles 33-42
  { title: "RCB Clinches Second Women's Premier League Title", category: "Sports", page: 3, imageName: "rcb-wpl-title.jpg" },
  { title: "Surajkund International Crafts Mela Highlights Artisan Self-Reliance", category: "Culture", page: 3, imageName: "surajkund-crafts-mela.jpg" },
  { title: "Delhi Police Launches Operation Shastra", category: "Polity", page: 3, imageName: "operation-shastra.jpg" },
  { title: "India Wins Record Sixth ICC U-19 Cricket World Cup", category: "Sports", page: 3, imageName: "india-u19-world-cup.jpg" },
  { title: "NASA's SPHEREx Detects Organic Molecules in Interstellar Comet", category: "Science", page: 3, imageName: "nasa-spherex-comet.jpg" },
  { title: "RBI Keeps Repo Rate Unchanged at 5.25%", category: "Economy", page: 3, imageName: "rbi-repo-rate.jpg" },
  { title: "Global Push to End Female Genital Mutilation", category: "Social", page: 3, imageName: "end-fgm.jpg" },
  { title: "Alwar Achieves 100% Insurance Coverage", category: "Social", page: 3, imageName: "alwar-insurance.jpg" },
  { title: "Iran Reaffirms Support for Chabahar Port Project", category: "International", page: 3, imageName: "chabahar-port.jpg" },
  { title: "Government Rejects Lowering Age of Consent", category: "Polity", page: 3, imageName: "age-of-consent.jpg" },

  // PAGE 4 (FEB 6) - Articles 43-52
  { title: "Goa Becomes Second State to Publish Bird Atlas", category: "Environment", page: 4, imageName: "goa-bird-atlas.jpg" },
  { title: "Delhi Ranked Second Most Polluted City in January: CREA", category: "Environment", page: 4, imageName: "delhi-pollution.jpg" },
  { title: "Arun Icecreams Sets Guinness World Record in Hyderabad", category: "Economy", page: 4, imageName: "arun-icecreams-guinness.jpg" },
  { title: "Amaravati Quantum Valley Project Launched in Andhra Pradesh", category: "Technology", page: 4, imageName: "amaravati-quantum-valley.jpg" },
  { title: "China Clears Limited Rare Earth Exports to Japan", category: "International", page: 4, imageName: "china-rare-earth.jpg" },
  { title: "India Successfully Test-Fires Agni-III Ballistic Missile", category: "Defence", page: 4, imageName: "agni-iii-missile.jpg" },
  { title: "Tamil Nadu Launches Urban Greening Policy", category: "Environment", page: 4, imageName: "tamil-nadu-greening.jpg" },
  { title: "Iran's First Female Member Elected to IOC", category: "Sports", page: 4, imageName: "iran-ioc-female.jpg" },
  { title: "Bhutan Queen Mother Receives Upendra Nath Brahma Award", category: "Culture", page: 4, imageName: "bhutan-queen-award.jpg" },
  { title: "Karnataka Approves Ballot Papers for Panchayat Elections", category: "Polity", page: 4, imageName: "karnataka-ballot-papers.jpg" },

  // PAGE 5 (FEB 5) - Articles 53-62
  { title: "Trump Unveils Project Vault to Secure US Mineral Supplies", category: "International", page: 5, imageName: "project-vault-trump.jpg" },
  { title: "Hakki Pikki Tribe Members Stranded in Africa Due to Visa Expiry", category: "Social", page: 5, imageName: "hakki-pikki-tribe.jpg" },
  { title: "Chichón Volcano Shows Renewed Hydrothermal Activity", category: "Geography", page: 5, imageName: "chichon-volcano.jpg" },
  { title: "RBI Holds Repo Rate at 5.25% After Union Budget", category: "Economy", page: 5, imageName: "rbi-repo-rate-budget.jpg" },
  { title: "India–GCC Formalise Start of Free Trade Talks", category: "International", page: 5, imageName: "india-gcc-trade.jpg" },
  { title: "ISRO Prepares for GISAT-1A Launch", category: "Science", page: 5, imageName: "isro-gisat-1a.jpg" },
  { title: "Manipur Deputy CM Appointment Triggers Protests", category: "Polity", page: 5, imageName: "manipur-deputy-cm.jpg" },
  { title: "New Flowering Plant Species Discovered in Pakhal Sanctuary", category: "Environment", page: 5, imageName: "pakhal-plant-species.jpg" },
  { title: "Indian Researchers Develop Low-Cost Biosensor for Early Heart Attack Detection", category: "Science", page: 5, imageName: "heart-attack-biosensor.jpg" },
  { title: "Dubai to Launch Underground Dubai Loop Transport System", category: "Infrastructure", page: 5, imageName: "dubai-loop.jpg" },

  // PAGE 6 (FEB 4) - Articles 63-77
  { title: "India Develops Lead-Free Self-Powered Photodetector", category: "Science", page: 6, imageName: "lead-free-photodetector.jpg" },
  { title: "Indian Railways Deploys AI System to Prevent Elephant Deaths", category: "Environment", page: 6, imageName: "railways-ai-elephant.jpg" },
  { title: "Esha Singh Wins Gold at Asian Shooting Championship", category: "Sports", page: 6, imageName: "esha-singh-gold.jpg" },
  { title: "Rouble Nagi Wins Global Teacher Prize", category: "Social", page: 6, imageName: "rouble-nagi-teacher-prize.jpg" },
  { title: "Suruchi Singh and Samrat Rana Win Silver at Asian Championship", category: "Sports", page: 6, imageName: "suruchi-samrat-silver.jpg" },
  { title: "Bharat Taxi Launches Cooperative Cab Service in Delhi", category: "Economy", page: 6, imageName: "bharat-taxi.jpg" },
  { title: "Exercise Khanjar Begins at Missamari, Assam", category: "Defence", page: 6, imageName: "exercise-khanjar.jpg" },
  { title: "US Congress Approves Security Funds for Baltic States", category: "International", page: 6, imageName: "us-baltic-security.jpg" },
  { title: "Karnataka Rolls Out Automatic Property Mutation System", category: "Polity", page: 6, imageName: "karnataka-property-mutation.jpg" },
  { title: "NCDC Implements Yuva Sahakar and Swayamshakti Schemes", category: "Economy", page: 6, imageName: "ncdc-schemes.jpg" },
  { title: "India Joins BRICS Industrial Competencies Centre", category: "International", page: 6, imageName: "brics-industrial.jpg" },
  { title: "ECI to Host National Conference of State Election Commissioners", category: "Polity", page: 6, imageName: "eci-conference.jpg" },
  { title: "Paradip Port Authority Wins Swachhata Pakhwada Award", category: "Culture", page: 6, imageName: "paradip-swachhata.jpg" },
  { title: "Bharat Rang Mahotsav 25th Edition Opens in Rohtak", category: "Culture", page: 6, imageName: "bharat-rang-mahotsav.jpg" },
  { title: "Seychelles President to Visit India", category: "International", page: 6, imageName: "seychelles-president.jpg" },

  // PAGE 7 (FEB 3) - Articles 78-89
  { title: "NASA Revises Jupiter's Size Using Juno Mission Data", category: "Science", page: 7, imageName: "nasa-jupiter-juno.jpg" },
  { title: "Andre Beteille Passes Away at 91", category: "Culture", page: 7, imageName: "andre-beteille.jpg" },
  { title: "Milano–Cortina 2026 Alpine Skiing Schedule Announced", category: "Sports", page: 7, imageName: "milano-cortina-skiing.jpg" },
  { title: "India Issues First National Lung Cancer Care Guidelines", category: "Health", page: 7, imageName: "lung-cancer-guidelines.jpg" },
  { title: "Elon Musk Becomes World's First $800 Billion Individual", category: "Economy", page: 7, imageName: "elon-musk-800b.jpg" },
  { title: "India–China Trade Reaches Record Level", category: "Economy", page: 7, imageName: "india-china-trade.jpg" },
  { title: "World Government Summit 2026 Opens in Dubai", category: "International", page: 7, imageName: "world-govt-summit.jpg" },
  { title: "Kamakhya Ropeway Project to Boost Religious Tourism", category: "Infrastructure", page: 7, imageName: "kamakhya-ropeway.jpg" },
  { title: "Badminton Asia Team Championships Begin in Qingdao", category: "Sports", page: 7, imageName: "badminton-asia.jpg" },
  { title: "DRDO Successfully Demonstrates SFDR Missile Technology", category: "Defence", page: 7, imageName: "drdo-sfdr-missile.jpg" },
  { title: "India Sends Devnimori Buddha Relics to Sri Lanka", category: "Culture", page: 7, imageName: "devnimori-relics.jpg" },
  { title: "Moltbook Emerges as AI-Only Social Network Experiment", category: "Technology", page: 7, imageName: "moltbook-ai.jpg" },

  // PAGE 8 (FEB 2) - Articles 90-99
  { title: "Kerala to Launch NeophyteID App for Invasive Plant Detection", category: "Environment", page: 8, imageName: "neophyteid-app.jpg" },
  { title: "Explosive Eruption at Guatemala's Volcán de Fuego", category: "Geography", page: 8, imageName: "volcan-de-fuego.jpg" },
  { title: "SAKSHAM 2026 Campaign Launched for Fuel Conservation", category: "Energy", page: 8, imageName: "saksham-2026.jpg" },
  { title: "India Signs Pact to Launch Bharat Container Shipping Line", category: "Infrastructure", page: 8, imageName: "bharat-container-shipping.jpg" },
  { title: "RBI Appoints Vinay Tonse as YES Bank MD & CEO", category: "Economy", page: 8, imageName: "vinay-tonse-yes-bank.jpg" },
  { title: "Walmart Becomes First Retailer to Reach $1 Trillion Valuation", category: "Economy", page: 8, imageName: "walmart-1-trillion.jpg" },
  { title: "Spain Bans Social Media Access for Children Under 16", category: "Social", page: 8, imageName: "spain-social-media-ban.jpg" },
  { title: "Yumnam Khemchand Singh Sworn in as Manipur Chief Minister", category: "Polity", page: 8, imageName: "manipur-cm.jpg" },
  { title: "Yuki Bhambri Enters ATP Top 20 in Doubles", category: "Sports", page: 8, imageName: "yuki-bhambri-atp.jpg" },
  { title: "Veteran Music Director SP Venkatesh Passes Away", category: "Culture", page: 8, imageName: "sp-venkatesh.jpg" },

  // PAGE 9 (FEB 1) - Articles 100-108
  { title: "Haven-1 Set to Become World's First Private Space Station", category: "Science", page: 9, imageName: "haven-1-space-station.jpg" },
  { title: "Mahatma Gandhi Statue Stolen in Australia", category: "International", page: 9, imageName: "gandhi-statue-australia.jpg" },
  { title: "IIM Udaipur Hosts India Digital Conclave 2026", category: "Education", page: 9, imageName: "iim-digital-conclave.jpg" },
  { title: "World Seafood Congress 2026 to Be Held in Chennai", category: "Economy", page: 9, imageName: "seafood-congress.jpg" },
  { title: "X8.3 Solar Flare — Strongest of 2026", category: "Science", page: 9, imageName: "solar-flare-x8.jpg" },
  { title: "Anahat Singh Breaks into World Top 20 in Squash", category: "Sports", page: 9, imageName: "anahat-singh-squash.jpg" },
  { title: "India–US Trade Deal Cuts Tariffs to 18 Percent", category: "Economy", page: 9, imageName: "india-us-tariffs.jpg" },
  { title: "Dalai Lama Wins Grammy Award", category: "Culture", page: 9, imageName: "dalai-lama-grammy.jpg" },
  { title: "Veerabhadran Ramanathan Honoured with Nobel of Geosciences", category: "Science", page: 9, imageName: "ramanathan-nobel.jpg" },

  // PAGE 10 (JAN 31) - Articles 109-117
  { title: "Census 2027 Adopts Digital-First Enumeration Framework", category: "Polity", page: 10, imageName: "census-2027-digital.jpg" },
  { title: "DST Scientists Develop Photo-Rechargeable Supercapacitor", category: "Science", page: 10, imageName: "supercapacitor.jpg" },
  { title: "India AI Impact Summit 2026 Announced", category: "Technology", page: 10, imageName: "ai-impact-summit.jpg" },
  { title: "NSO to Conduct Nationwide Migration Survey", category: "Social", page: 10, imageName: "migration-survey.jpg" },
  { title: "Supreme Court Orders Tribunal on Pennaiyar River Dispute", category: "Polity", page: 10, imageName: "pennaiyar-tribunal.jpg" },
  { title: "Gyan Bharatam to Preserve India's Manuscript Heritage", category: "Culture", page: 10, imageName: "gyan-bharatam.jpg" },
  { title: "Gujarat Leads India in Renewable Energy Capacity", category: "Environment", page: 10, imageName: "gujarat-renewable.jpg" },
  { title: "Andhra Pradesh Launches Pilloo AI Accounting App", category: "Technology", page: 10, imageName: "pilloo-ai-app.jpg" },
  { title: "Insolvency and Bankruptcy Code Amendment Bill Likely", category: "Economy", page: 10, imageName: "ibc-amendment.jpg" },

  // PAGE 11 (JAN 30) - Articles 118-125
  { title: "Daily Current Affairs Quiz – February 3, 2026", category: "ExamUtility", page: 11, imageName: "quiz-feb-3-2026.jpg" },
  { title: "India AI Impact Summit 2026 – Global AI Gathering", category: "Technology", page: 11, imageName: "ai-summit-global.jpg" },
  { title: "NSO Migration Survey to Inform Labour & Urban Policy", category: "Social", page: 11, imageName: "nso-migration-policy.jpg" },
  { title: "Pennaiyar River Tribunal to Address Inter-State Water Dispute", category: "Polity", page: 11, imageName: "pennaiyar-dispute.jpg" },
  { title: "Gyan Bharatam Mission to Preserve Manuscript Heritage", category: "Culture", page: 11, imageName: "gyan-bharatam-mission.jpg" },
  { title: "Gujarat Emerges as India's Renewable Energy Leader", category: "Environment", page: 11, imageName: "gujarat-energy-leader.jpg" },
  { title: "Andhra Pradesh Launches AI-Based Accounting App for MSMEs", category: "Technology", page: 11, imageName: "ap-ai-accounting.jpg" },
  { title: "Insolvency and Bankruptcy Code Amendment Proposed", category: "Economy", page: 11, imageName: "ibc-amendment-proposed.jpg" }
];

/* ================= CONTENT TEMPLATES (READY FOR CUSTOM EDITING) ================= */

// You can customize content for each article here
const ARTICLE_CONTENT = {
  // Example of how to add custom content:
  // "Daily Current Affairs Quiz: February 8–9, 2026": `
  //   <h2>Overview</h2>
  //   <p>Custom content here...</p>
  // `,
  
  // Add more custom content as needed
};

/* ================= CONTENT GENERATOR ================= */

const generateContent = (title, category) => {
  // Check if custom content exists
  if (ARTICLE_CONTENT[title]) {
    return ARTICLE_CONTENT[title];
  }
  
  // Default template
  return `
<h2>Introduction</h2>
<p>${title} is an important current affairs topic relevant for competitive examinations, particularly UPSC, SSC, and State PSC exams.</p>

<h2>Key Highlights</h2>
<ul>
  <li><strong>Category:</strong> ${category}</li>
  <li><strong>Context:</strong> Recent development with national and international significance</li>
  <li><strong>Relevance:</strong> Policy implications and governance aspects</li>
  <li><strong>Impact:</strong> Short-term and long-term consequences</li>
</ul>

<h2>Detailed Analysis</h2>
<p>This development holds significance in the context of ${category.toLowerCase()} sector developments in India. It reflects ongoing policy initiatives and strategic planning by relevant stakeholders.</p>

<h3>Background</h3>
<p>Understanding the historical context and previous related developments helps in comprehensive analysis of this topic.</p>

<h3>Current Scenario</h3>
<p>The present situation involves multiple dimensions including administrative, technical, and social aspects that need careful consideration.</p>

<h3>Implications</h3>
<p>The implications of this development extend to various sectors including governance, economy, society, and international relations.</p>

<h2>Exam Perspective</h2>
<p>For UPSC and other competitive examinations, this topic can be approached from multiple angles:</p>
<ul>
  <li>Constitutional and legal framework</li>
  <li>Policy implementation and challenges</li>
  <li>Comparative analysis with similar initiatives</li>
  <li>Future prospects and recommendations</li>
</ul>

<h3>Practice Questions</h3>
<ol>
  <li><strong>Mains:</strong> Discuss the significance of this development in the context of India's ${category.toLowerCase()} sector. Analyze its impact on related stakeholders.</li>
  <li><strong>Mains:</strong> Examine the challenges and opportunities presented by this initiative. Suggest measures for effective implementation.</li>
  <li><strong>Prelims:</strong> Multiple choice questions can focus on factual aspects, key personalities, locations, and dates associated with this topic.</li>
</ol>

<h2>Key Takeaways</h2>
<ul>
  <li>Understand the core concept and its significance</li>
  <li>Remember important facts, figures, and dates</li>
  <li>Analyze multi-dimensional impacts</li>
  <li>Connect with related topics for holistic understanding</li>
</ul>

<h2>Sources & References</h2>
<p>PIB, Government Press Releases, Official Websites, and Authentic News Sources</p>
`;
};

/* ================= FINAL BUILD ================= */

const allArticles = ARTICLE_LIST.map((article, index) => {
  const articleDate = getArticleDate(article.page);
  
  return {
    title: article.title,
    slug: `${index + 1}-${article.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    summary: `Comprehensive analysis of ${article.title} with exam-oriented insights for UPSC, SSC, and State PSC aspirants.`,
    content: generateContent(article.title, article.category),
    category: article.category,
    tags: TAGS[article.category] || ["UPSC"],
    featuredImage: {
      // Option 1: Use imageName for local/uploaded images
      url: `/images/articles/${article.imageName}`,
      // Option 2: Fallback to Unsplash if image not available
      // url: `https://source.unsplash.com/800x400/?${article.category.toLowerCase()},india`,
      alt: article.title
    },
    publishDate: articleDate,
    lastUpdated: articleDate,
    readingTime: "6 min",
    author: "Current Affairs Desk",
    examRelevance: ["UPSC", "SSC", "State PSC"],
    difficulty: ["Beginner", "Intermediate", "Advanced"][index % 3],
    sources: ["PIB", "Government Releases", "Official Statements"],
    viewCount: 0,
    likes: 0,
    pageNumber: article.page
  };
});

export default allArticles;