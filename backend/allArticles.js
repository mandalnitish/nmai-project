/* ==========================================================================
   UPDATED: Fixed image paths to work with /images/articles/ directory
   ========================================================================== */

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

/* ================= INDIVIDUAL ARTICLE CONTENT ================= */

const ARTICLE_CONTENT = {
  
  "NSO Launches MCP Server for eSankhyiki Portal": {
    introduction: `The National Statistical Office (NSO) has launched an MCP (Model Context Protocol) Server for the eSankhyiki Portal, marking a significant advancement in India's statistical data infrastructure and digital governance framework.`,
    
    keyHighlights: [
      { label: "Organization", value: "National Statistical Office (NSO)" },
      { label: "Initiative", value: "MCP Server for eSankhyiki Portal" },
      { label: "Significance", value: "Enhanced data accessibility and statistical analysis" },
      { label: "Impact", value: "Improved data-driven policy making" }
    ],
    
    sections: [
      {
        heading: "About eSankhyiki Portal",
        content: `eSankhyiki is India's official statistical portal that provides access to official statistics on various socio-economic indicators. It serves as a one-stop platform for statistical data dissemination.`
      },
      {
        heading: "What is MCP Server?",
        content: `Model Context Protocol (MCP) Server is an advanced technology framework that enables better data integration, real-time statistical analysis, and improved user interaction with large datasets. It facilitates seamless data exchange between different statistical systems.`
      },
      {
        heading: "Key Features",
        content: `The MCP Server enables:
        <ul>
          <li>Real-time data processing and analysis</li>
          <li>Enhanced data security and integrity</li>
          <li>Improved user interface for data visualization</li>
          <li>Integration with AI/ML tools for advanced analytics</li>
          <li>Better interoperability with other government databases</li>
        </ul>`
      },
      {
        heading: "Significance for Policy Making",
        content: `This technological upgrade will enable policymakers, researchers, and citizens to access and analyze statistical data more efficiently, leading to better evidence-based policy formulation and implementation.`
      },
      {
        heading: "About National Statistical Office (NSO)",
        content: `NSO is the nodal agency for planned development of the statistical system in India. It functions under the Ministry of Statistics and Programme Implementation (MoSPI). NSO conducts various surveys including Census, National Sample Survey, and Annual Survey of Industries.`
      }
    ],
    
    examPerspective: {
      points: [
        "Understand NSO's role in India's statistical system",
        "Know about digital governance initiatives",
        "MCP technology and its applications",
        "Data-driven governance and policy making",
        "Connection with Digital India mission"
      ]
    },
    
    practiceQuestions: [
      { 
        type: "Mains", 
        question: "Discuss the significance of the MCP Server launch for eSankhyiki Portal in the context of data-driven governance in India. How does it align with Digital India objectives?" 
      },
      { 
        type: "Mains", 
        question: "Examine the role of National Statistical Office in India's statistical infrastructure. Analyze the challenges in statistical data management and how technological interventions can address them." 
      },
      { 
        type: "Prelims", 
        question: "Which ministry does the National Statistical Office (NSO) function under? What are the major surveys conducted by NSO?" 
      }
    ],
    
    keyTakeaways: [
      "NSO launched MCP Server for eSankhyiki Portal",
      "Enhances statistical data accessibility and analysis",
      "Part of digital governance and Digital India initiative",
      "Enables evidence-based policy formulation",
      "NSO functions under MoSPI"
    ],
    
    sources: ["PIB", "MoSPI Official Website", "eSankhyiki Portal"]
  },

};

/* ================= DEFAULT CONTENT TEMPLATE ================= */

const getDefaultContent = (title, category) => ({
  introduction: `${title} is an important current affairs topic relevant for competitive examinations, particularly UPSC, SSC, and State PSC exams.`,
  
  keyHighlights: [
    { label: "Category", value: category },
    { label: "Context", value: "Recent development with national and international significance" },
    { label: "Relevance", value: "Policy implications and governance aspects" },
    { label: "Impact", value: "Short-term and long-term consequences" }
  ],
  
  sections: [
    {
      heading: "Background",
      content: `Understanding the historical context and previous related developments helps in comprehensive analysis of this topic.`
    },
    {
      heading: "Current Scenario",
      content: `The present situation involves multiple dimensions including administrative, technical, and social aspects that need careful consideration.`
    },
    {
      heading: "Implications",
      content: `The implications of this development extend to various sectors including governance, economy, society, and international relations.`
    }
  ],
  
  examPerspective: {
    points: [
      "Constitutional and legal framework",
      "Policy implementation and challenges",
      "Comparative analysis with similar initiatives",
      "Future prospects and recommendations"
    ]
  },
  
  practiceQuestions: [
    { 
      type: "Mains", 
      question: `Discuss the significance of this development in the context of India's ${category.toLowerCase()} sector. Analyze its impact on related stakeholders.` 
    },
    { 
      type: "Mains", 
      question: "Examine the challenges and opportunities presented by this initiative. Suggest measures for effective implementation." 
    },
    { 
      type: "Prelims", 
      question: "Multiple choice questions can focus on factual aspects, key personalities, locations, and dates associated with this topic." 
    }
  ],
  
  keyTakeaways: [
    "Understand the core concept and its significance",
    "Remember important facts, figures, and dates",
    "Analyze multi-dimensional impacts",
    "Connect with related topics for holistic understanding"
  ],
  
  sources: ["PIB", "Government Press Releases", "Official Websites"]
});

/* ================= HTML CONTENT GENERATOR ================= */

const generateHTMLContent = (title, category) => {
  const contentData = ARTICLE_CONTENT[title] || getDefaultContent(title, category);
  
  let html = `<h2>Introduction</h2>
<p>${contentData.introduction}</p>

<h2>Key Highlights</h2>
<ul>`;

  contentData.keyHighlights.forEach(item => {
    html += `
  <li><strong>${item.label}:</strong> ${item.value}</li>`;
  });

  html += `
</ul>

<h2>Detailed Analysis</h2>`;

  contentData.sections.forEach(section => {
    html += `
<h3>${section.heading}</h3>
<p>${section.content}</p>`;
  });

  html += `

<h2>Exam Perspective</h2>
<p>For UPSC and other competitive examinations, this topic can be approached from multiple angles:</p>
<ul>`;

  contentData.examPerspective.points.forEach(point => {
    html += `
  <li>${point}</li>`;
  });

  html += `
</ul>

<h3>Practice Questions</h3>
<ol>`;

  contentData.practiceQuestions.forEach(q => {
    html += `
  <li><strong>${q.type}:</strong> ${q.question}</li>`;
  });

  html += `
</ol>

<h2>Key Takeaways</h2>
<ul>`;

  contentData.keyTakeaways.forEach(takeaway => {
    html += `
  <li>${takeaway}</li>`;
  });

  html += `
</ul>

<h2>Sources & References</h2>
<p>${contentData.sources.join(", ")}</p>`;

  return html;
};

/* ================= ALL ARTICLES LIST ================= */

const ARTICLE_LIST = [
 
  // PAGE 1 (FEB 9, 2026 – LATEST) - Articles 0-23
  { title: "Daily Current Affairs Quiz: February 8–9, 2026", category: "ExamUtility", page: 1, imageName: "quiz-feb-8-9-2026" },
  { title: "INS Arnala, Anti-Submarine Warfare Shallow Water Craft", category: "Defence", page: 1, imageName: "ins-arnala" },
  { title: "NSO Launches MCP Server for eSankhyiki Portal", category: "Economy", page: 1, imageName: "nso-mcp-esankhyiki" },
  { title: "Two New Marine Worm Species Discovered off West Bengal Coast", category: "Environment", page: 1, imageName: "marine-worms-west-bengal" },
  { title: "INS Arnala Strengthens India's Indigenous Naval Capability", category: "Defence", page: 1, imageName: "ins-arnala-naval" },
  { title: "World's Longest Snake Recorded in Sulawesi, Indonesia", category: "Environment", page: 1, imageName: "longest-snake-sulawesi" },
  { title: "New Trapdoor Spider Species Found in Kolhapur Grasslands", category: "Environment", page: 1, imageName: "trapdoor-spider-kolhapur" },
  { title: "Sharda River Corridor Project Launched in Champawat", category: "Infrastructure", page: 1, imageName: "sharda-river-corridor" },
  { title: "Centre Plans Comprehensive Development of Kondaveedu Fort", category: "Culture", page: 1, imageName: "kondaveedu-fort" },
  { title: "India Explores New Kailash Yatra Route via Shipki La Pass", category: "International", page: 1, imageName: "kailash-yatra-shipki-la" },
  { title: "New Ant Species Discovered in Guwahati's Garbhanga Forest", category: "Environment", page: 1, imageName: "ant-species-guwahati" },
  { title: "Eurasian Otter Returns to Kashmir via LoC Waterways", category: "Environment", page: 1, imageName: "eurasian-otter-kashmir" },
  { title: "International Epilepsy Day 2026 Observed Globally", category: "Health", page: 1, imageName: "epilepsy-day-2026" },
  { title: "India Clinch SAFF U-19 Women's Championship Title", category: "Sports", page: 1, imageName: "saff-u19-women" },
  { title: "Chess Added to Esports Nations Cup 2026 Line-up", category: "Sports", page: 1, imageName: "chess-esports-nations-cup" },
  { title: "Wool Production in India: States, Types and Industry Profile", category: "Geography", page: 1, imageName: "wool-production-india" },
  { title: "Himachal CM Launches 'Padhai with AI' Initiative", category: "Education", page: 1, imageName: "padhai-with-ai" },
  { title: "Azista Space Achieves India's First In-Orbit Snooping Capability", category: "Science", page: 1, imageName: "azista-space-orbit" },
  { title: "Anutin Charnvirakul Wins Thailand Snap Election", category: "International", page: 1, imageName: "thailand-election" },
  { title: "Sanae Takaichi Secures Supermajority in Japan Election", category: "International", page: 1, imageName: "japan-election" },
  { title: "Arjun Ram Meghwal Launches The Medicolegal Guidebook", category: "Polity", page: 1, imageName: "medicolegal-guidebook" },
  { title: "Queensland Moves to Ban Pro-Palestinian Slogans", category: "International", page: 1, imageName: "queensland-ban" },
  { title: "Cardinal Poola Anthony Elected CBCI President", category: "Culture", page: 1, imageName: "cbci-president" },
  { title: "India Ranks Second Globally in LEED-Certified Green Realty", category: "Environment", page: 1, imageName: "leed-green-realty" },

  // PAGE 2 (FEB 8) - Articles 24-32
  { title: "Meghana Sajjanar Wins Asian Shooting Championships Bronze", category: "Sports", page: 2, imageName: "meghana-sajjanar-bronze" },
  { title: "India–US Trade Pact Cuts Duties on Wines and Dry Fruits", category: "Economy", page: 2, imageName: "india-us-trade-pact" },
  { title: "RSS Flag March from Kashmir to Kanyakumari", category: "Polity", page: 2, imageName: "rss-flag-march" },
  { title: "Cancer Cells Reprogramme Immune Cells to Aid Tumour Growth", category: "Science", page: 2, imageName: "cancer-cells-research" },
  { title: "South Africa Launches First Local FMD Vaccine in 20 Years", category: "Science", page: 2, imageName: "south-africa-fmd-vaccine" },
  { title: "PM Modi Begins Two-Day Official Visit to Malaysia", category: "International", page: 2, imageName: "pm-modi-malaysia" },
  { title: "India's Forex Reserves Hit Record High", category: "Economy", page: 2, imageName: "forex-reserves" },
  { title: "US Removes Additional 25% Tariffs on Indian Goods", category: "Economy", page: 2, imageName: "us-tariffs-removal" },
  { title: "VOC Port Becomes First in India to Deploy Anti-Drone System", category: "Defence", page: 2, imageName: "voc-port-anti-drone" },

  // PAGE 3 (FEB 7) - Articles 33-42
  { title: "RCB Clinches Second Women's Premier League Title", category: "Sports", page: 3, imageName: "rcb-wpl-title" },
  { title: "Surajkund International Crafts Mela Highlights Artisan Self-Reliance", category: "Culture", page: 3, imageName: "surajkund-crafts-mela" },
  { title: "Delhi Police Launches Operation Shastra", category: "Polity", page: 3, imageName: "operation-shastra" },
  { title: "India Wins Record Sixth ICC U-19 Cricket World Cup", category: "Sports", page: 3, imageName: "india-u19-world-cup" },
  { title: "NASA's SPHEREx Detects Organic Molecules in Interstellar Comet", category: "Science", page: 3, imageName: "nasa-spherex-comet" },
  { title: "RBI Keeps Repo Rate Unchanged at 5.25%", category: "Economy", page: 3, imageName: "rbi-repo-rate" },
  { title: "Global Push to End Female Genital Mutilation", category: "Social", page: 3, imageName: "end-fgm" },
  { title: "Alwar Achieves 100% Insurance Coverage", category: "Social", page: 3, imageName: "alwar-insurance" },
  { title: "Iran Reaffirms Support for Chabahar Port Project", category: "International", page: 3, imageName: "chabahar-port" },
  { title: "Government Rejects Lowering Age of Consent", category: "Polity", page: 3, imageName: "age-of-consent" },

  // PAGE 4 (FEB 6) - Articles 43-52
  { title: "Goa Becomes Second State to Publish Bird Atlas", category: "Environment", page: 4, imageName: "goa-bird-atlas" },
  { title: "Delhi Ranked Second Most Polluted City in January: CREA", category: "Environment", page: 4, imageName: "delhi-pollution" },
  { title: "Arun Icecreams Sets Guinness World Record in Hyderabad", category: "Economy", page: 4, imageName: "arun-icecreams-guinness" },
  { title: "Amaravati Quantum Valley Project Launched in Andhra Pradesh", category: "Technology", page: 4, imageName: "amaravati-quantum-valley" },
  { title: "China Clears Limited Rare Earth Exports to Japan", category: "International", page: 4, imageName: "china-rare-earth" },
  { title: "India Successfully Test-Fires Agni-III Ballistic Missile", category: "Defence", page: 4, imageName: "agni-iii-missile" },
  { title: "Tamil Nadu Launches Urban Greening Policy", category: "Environment", page: 4, imageName: "tamil-nadu-greening" },
  { title: "Iran's First Female Member Elected to IOC", category: "Sports", page: 4, imageName: "iran-ioc-female" },
  { title: "Bhutan Queen Mother Receives Upendra Nath Brahma Award", category: "Culture", page: 4, imageName: "bhutan-queen-award" },
  { title: "Karnataka Approves Ballot Papers for Panchayat Elections", category: "Polity", page: 4, imageName: "karnataka-ballot-papers" },

  // PAGE 5 (FEB 5) - Articles 53-62
  { title: "Trump Unveils Project Vault to Secure US Mineral Supplies", category: "International", page: 5, imageName: "project-vault-trump" },
  { title: "Hakki Pikki Tribe Members Stranded in Africa Due to Visa Expiry", category: "Social", page: 5, imageName: "hakki-pikki-tribe" },
  { title: "Chichón Volcano Shows Renewed Hydrothermal Activity", category: "Geography", page: 5, imageName: "chichon-volcano" },
  { title: "RBI Holds Repo Rate at 5.25% After Union Budget", category: "Economy", page: 5, imageName: "rbi-repo-rate-budget" },
  { title: "India–GCC Formalise Start of Free Trade Talks", category: "International", page: 5, imageName: "india-gcc-trade" },
  { title: "ISRO Prepares for GISAT-1A Launch", category: "Science", page: 5, imageName: "isro-gisat-1a" },
  { title: "Manipur Deputy CM Appointment Triggers Protests", category: "Polity", page: 5, imageName: "manipur-deputy-cm" },
  { title: "New Flowering Plant Species Discovered in Pakhal Sanctuary", category: "Environment", page: 5, imageName: "pakhal-plant-species" },
  { title: "Indian Researchers Develop Low-Cost Biosensor for Early Heart Attack Detection", category: "Science", page: 5, imageName: "heart-attack-biosensor" },
  { title: "Dubai to Launch Underground Dubai Loop Transport System", category: "Infrastructure", page: 5, imageName: "dubai-loop" },

  // PAGE 6 (FEB 4) - Articles 63-77
  { title: "India Develops Lead-Free Self-Powered Photodetector", category: "Science", page: 6, imageName: "lead-free-photodetector" },
  { title: "Indian Railways Deploys AI System to Prevent Elephant Deaths", category: "Environment", page: 6, imageName: "railways-ai-elephant" },
  { title: "Esha Singh Wins Gold at Asian Shooting Championship", category: "Sports", page: 6, imageName: "esha-singh-gold" },
  { title: "Rouble Nagi Wins Global Teacher Prize", category: "Social", page: 6, imageName: "rouble-nagi-teacher-prize" },
  { title: "Suruchi Singh and Samrat Rana Win Silver at Asian Championship", category: "Sports", page: 6, imageName: "suruchi-samrat-silver" },
  { title: "Bharat Taxi Launches Cooperative Cab Service in Delhi", category: "Economy", page: 6, imageName: "bharat-taxi" },
  { title: "Exercise Khanjar Begins at Missamari, Assam", category: "Defence", page: 6, imageName: "exercise-khanjar" },
  { title: "US Congress Approves Security Funds for Baltic States", category: "International", page: 6, imageName: "us-baltic-security" },
  { title: "Karnataka Rolls Out Automatic Property Mutation System", category: "Polity", page: 6, imageName: "karnataka-property-mutation" },
  { title: "NCDC Implements Yuva Sahakar and Swayamshakti Schemes", category: "Economy", page: 6, imageName: "ncdc-schemes" },
  { title: "India Joins BRICS Industrial Competencies Centre", category: "International", page: 6, imageName: "brics-industrial" },
  { title: "ECI to Host National Conference of State Election Commissioners", category: "Polity", page: 6, imageName: "eci-conference" },
  { title: "Paradip Port Authority Wins Swachhata Pakhwada Award", category: "Culture", page: 6, imageName: "paradip-swachhata" },
  { title: "Bharat Rang Mahotsav 25th Edition Opens in Rohtak", category: "Culture", page: 6, imageName: "bharat-rang-mahotsav" },
  { title: "Seychelles President to Visit India", category: "International", page: 6, imageName: "seychelles-president" },

  // PAGE 7 (FEB 3) - Articles 78-89
  { title: "NASA Revises Jupiter's Size Using Juno Mission Data", category: "Science", page: 7, imageName: "nasa-jupiter-juno" },
  { title: "Andre Beteille Passes Away at 91", category: "Culture", page: 7, imageName: "andre-beteille" },
  { title: "Milano–Cortina 2026 Alpine Skiing Schedule Announced", category: "Sports", page: 7, imageName: "milano-cortina-skiing" },
  { title: "India Issues First National Lung Cancer Care Guidelines", category: "Health", page: 7, imageName: "lung-cancer-guidelines" },
  { title: "Elon Musk Becomes World's First $800 Billion Individual", category: "Economy", page: 7, imageName: "elon-musk-800b" },
  { title: "India–China Trade Reaches Record Level", category: "Economy", page: 7, imageName: "india-china-trade" },
  { title: "World Government Summit 2026 Opens in Dubai", category: "International", page: 7, imageName: "world-govt-summit" },
  { title: "Kamakhya Ropeway Project to Boost Religious Tourism", category: "Infrastructure", page: 7, imageName: "kamakhya-ropeway" },
  { title: "Badminton Asia Team Championships Begin in Qingdao", category: "Sports", page: 7, imageName: "badminton-asia" },
  { title: "DRDO Successfully Demonstrates SFDR Missile Technology", category: "Defence", page: 7, imageName: "drdo-sfdr-missile" },
  { title: "India Sends Devnimori Buddha Relics to Sri Lanka", category: "Culture", page: 7, imageName: "devnimori-relics" },
  { title: "Moltbook Emerges as AI-Only Social Network Experiment", category: "Technology", page: 7, imageName: "moltbook-ai" },

  // PAGE 8 (FEB 2) - Articles 90-99
  { title: "Kerala to Launch NeophyteID App for Invasive Plant Detection", category: "Environment", page: 8, imageName: "neophyteid-app" },
  { title: "Explosive Eruption at Guatemala's Volcán de Fuego", category: "Geography", page: 8, imageName: "volcan-de-fuego" },
  { title: "SAKSHAM 2026 Campaign Launched for Fuel Conservation", category: "Energy", page: 8, imageName: "saksham-2026" },
  { title: "India Signs Pact to Launch Bharat Container Shipping Line", category: "Infrastructure", page: 8, imageName: "bharat-container-shipping" },
  { title: "RBI Appoints Vinay Tonse as YES Bank MD & CEO", category: "Economy", page: 8, imageName: "vinay-tonse-yes-bank" },
  { title: "Walmart Becomes First Retailer to Reach $1 Trillion Valuation", category: "Economy", page: 8, imageName: "walmart-1-trillion" },
  { title: "Spain Bans Social Media Access for Children Under 16", category: "Social", page: 8, imageName: "spain-social-media-ban" },
  { title: "Yumnam Khemchand Singh Sworn in as Manipur Chief Minister", category: "Polity", page: 8, imageName: "manipur-cm" },
  { title: "Yuki Bhambri Enters ATP Top 20 in Doubles", category: "Sports", page: 8, imageName: "yuki-bhambri-atp" },
  { title: "Veteran Music Director SP Venkatesh Passes Away", category: "Culture", page: 8, imageName: "sp-venkatesh" },

  // PAGE 9 (FEB 1) - Articles 100-108
  { title: "Haven-1 Set to Become World's First Private Space Station", category: "Science", page: 9, imageName: "haven-1-space-station" },
  { title: "Mahatma Gandhi Statue Stolen in Australia", category: "International", page: 9, imageName: "gandhi-statue-australia" },
  { title: "IIM Udaipur Hosts India Digital Conclave 2026", category: "Education", page: 9, imageName: "iim-digital-conclave" },
  { title: "World Seafood Congress 2026 to Be Held in Chennai", category: "Economy", page: 9, imageName: "seafood-congress" },
  { title: "X8.3 Solar Flare — Strongest of 2026", category: "Science", page: 9, imageName: "solar-flare-x8" },
  { title: "Anahat Singh Breaks into World Top 20 in Squash", category: "Sports", page: 9, imageName: "anahat-singh-squash" },
  { title: "India–US Trade Deal Cuts Tariffs to 18 Percent", category: "Economy", page: 9, imageName: "india-us-tariffs" },
  { title: "Dalai Lama Wins Grammy Award", category: "Culture", page: 9, imageName: "dalai-lama-grammy" },
  { title: "Veerabhadran Ramanathan Honoured with Nobel of Geosciences", category: "Science", page: 9, imageName: "ramanathan-nobel" },

  // PAGE 10 (JAN 31) - Articles 109-117
  { title: "Census 2027 Adopts Digital-First Enumeration Framework", category: "Polity", page: 10, imageName: "census-2027-digital" },
  { title: "DST Scientists Develop Photo-Rechargeable Supercapacitor", category: "Science", page: 10, imageName: "supercapacitor" },
  { title: "India AI Impact Summit 2026 Announced", category: "Technology", page: 10, imageName: "ai-impact-summit" },
  { title: "NSO to Conduct Nationwide Migration Survey", category: "Social", page: 10, imageName: "migration-survey" },
  { title: "Supreme Court Orders Tribunal on Pennaiyar River Dispute", category: "Polity", page: 10, imageName: "pennaiyar-tribunal" },
  { title: "Gyan Bharatam to Preserve India's Manuscript Heritage", category: "Culture", page: 10, imageName: "gyan-bharatam" },
  { title: "Gujarat Leads India in Renewable Energy Capacity", category: "Environment", page: 10, imageName: "gujarat-renewable" },
  { title: "Andhra Pradesh Launches Pilloo AI Accounting App", category: "Technology", page: 10, imageName: "pilloo-ai-app" },
  { title: "Insolvency and Bankruptcy Code Amendment Bill Likely", category: "Economy", page: 10, imageName: "ibc-amendment" },

  // PAGE 11 (JAN 30) - Articles 118-125
  { title: "Daily Current Affairs Quiz – February 3, 2026", category: "ExamUtility", page: 11, imageName: "quiz-feb-3-2026" },
  { title: "India AI Impact Summit 2026 – Global AI Gathering", category: "Technology", page: 11, imageName: "ai-summit-global" },
  { title: "NSO Migration Survey to Inform Labour & Urban Policy", category: "Social", page: 11, imageName: "nso-migration-policy" },
  { title: "Pennaiyar River Tribunal to Address Inter-State Water Dispute", category: "Polity", page: 11, imageName: "pennaiyar-dispute" },
  { title: "Gyan Bharatam Mission to Preserve Manuscript Heritage", category: "Culture", page: 11, imageName: "gyan-bharatam-mission" },
  { title: "Gujarat Emerges as India's Renewable Energy Leader", category: "Environment", page: 11, imageName: "gujarat-energy-leader" },
  { title: "Andhra Pradesh Launches AI-Based Accounting App for MSMEs", category: "Technology", page: 11, imageName: "ap-ai-accounting" },
  { title: "Insolvency and Bankruptcy Code Amendment Proposed", category: "Economy", page: 11, imageName: "ibc-amendment-proposed" }
];

/* ================= FINAL BUILD ================= */

const allArticles = ARTICLE_LIST.map((article, index) => {
  const articleDate = getArticleDate(article.page);
  
  return {
    title: article.title,
    slug: `${index + 1}-${article.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    summary: `Comprehensive analysis of ${article.title} with exam-oriented insights for UPSC, SSC, and State PSC aspirants.`,
    content: generateHTMLContent(article.title, article.category),
    category: article.category,
    tags: TAGS[article.category] || ["UPSC"],
    featuredImage: {
      // FIXED: Direct path to images in /images/articles/
      url: `/images/articles/${article.imageName}`,
      alt: article.title
    },
    publishDate: articleDate,
    lastUpdated: articleDate,
    readingTime: "6 min",
    author: "Admin",
    examRelevance: ["UPSC", "SSC", "State PSC"],
    difficulty: ["Beginner", "Intermediate", "Advanced"][index % 3],
    sources: ["PIB", "Government Releases", "Official Statements"],
    viewCount: 0,
    likes: 0,
    pageNumber: article.page
  };
});

export default allArticles;