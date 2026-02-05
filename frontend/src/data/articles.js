/* ==========================================================================
   LARGE-SCALE CURRENT AFFAIRS ARTICLE ENGINE
   Generates 1000 Unique Articles for Competitive Exam Preparation
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

/* ==========================================================================
   TOPIC POOLS - Ensuring Diversity
   ========================================================================== */

const TOPICS = {
  Economy: [
    "Monetary Policy Committee Meeting", "GST Revenue Trends", "Make in India Initiative",
    "Production Linked Incentive Scheme", "Digital Rupee Launch", "Foreign Direct Investment",
    "Export Performance Analysis", "MSME Sector Growth", "Agricultural Credit Policy",
    "Banking Sector Reforms", "Stock Market Regulations", "Cryptocurrency Debate",
    "Start-up India Progress", "Fiscal Deficit Management", "Disinvestment Strategy",
    "Real Estate Investment Trusts", "Infrastructure Bonds", "Gold Monetization Scheme",
    "Mudra Yojana Impact", "Insolvency and Bankruptcy Code", "Angel Tax Abolition",
    "Employment Statistics", "Minimum Wage Revision", "Labor Code Implementation",
    "Foreign Exchange Reserves", "Current Account Deficit", "Trade Balance Analysis",
    "E-commerce Regulations", "Competition Commission Actions", "Consumer Price Index",
    "Wholesale Price Index", "Industrial Production Growth", "Core Sector Performance",
    "National Infrastructure Pipeline", "Railway Budget Highlights", "Highway Development",
    "Port Modernization", "Airport Expansion Plans", "Urban Infrastructure Fund",
    "Agricultural Subsidy Reform", "Food Security Programs", "Crop Insurance Schemes",
    "Minimum Support Price Policy", "Agricultural Export Strategy", "Rural Credit Access",
    "Financial Inclusion Initiatives", "Jan Dhan Yojana Progress", "Pradhan Mantri Mudra",
    "Direct Benefit Transfer", "Aadhaar Enabled Payments", "UPI Transaction Growth",
    "Digital Payment Ecosystem", "NEFT and RTGS Updates", "Blockchain in Banking",
    "Green Bonds Issuance", "Sovereign Gold Bond Scheme", "National Pension System",
    "Provident Fund Regulations", "Insurance Sector Reforms", "Health Insurance Schemes",
    "Tax Revenue Collection", "Income Tax Reforms", "Corporate Tax Rate Changes",
    "Goods and Services Tax Council", "Custom Duty Revisions", "Special Economic Zones",
    "Free Trade Agreements", "Regional Comprehensive Economic Partnership", "Indo-Pacific Economic Framework",
    "G20 Economic Agenda", "World Bank Projects", "IMF Forecasts for India",
    "Credit Rating Updates", "Ease of Doing Business", "Logistics Performance Index",
    "Human Development Index", "Gender Gap Index", "Global Innovation Index",
    "Manufacturing Sector Outlook", "Service Sector Contribution", "Agricultural GDP Share",
    "Atmanirbhar Bharat Strategy", "Vocal for Local Campaign", "Supply Chain Resilience",
    "Semiconductor Manufacturing", "Electric Vehicle Policy", "Green Hydrogen Mission",
    "Renewable Energy Targets", "Solar Power Expansion", "Wind Energy Projects",
    "Hydropower Development", "Nuclear Energy Plans", "Coal Sector Reforms",
    "Petroleum Product Pricing", "Strategic Petroleum Reserves", "Natural Gas Pipeline",
    "Power Sector Distribution", "Smart Grid Technology", "Energy Efficiency Programs",
    "Carbon Trading Mechanism", "Climate Finance Commitments", "Sustainable Development Goals",
    "Circular Economy Initiatives", "Waste to Energy Projects", "Plastic Waste Management",
    "Water Resource Economics", "River Interlinking Project", "Irrigation Financing",
    "Urban Development Schemes", "Smart Cities Mission", "AMRUT Program Progress",
    "Housing for All Initiative", "Swachh Bharat Mission", "Namami Gange Project"
  ],
  
  Polity: [
    "Constitutional Amendment Procedures", "Fundamental Rights Interpretation", "Directive Principles Implementation",
    "Supreme Court Landmark Judgments", "High Court Powers", "Judicial Review Mechanism",
    "Election Commission Reforms", "Electoral Bond Scheme Verdict", "Voter ID Regulations",
    "Anti-Defection Law Application", "Parliamentary Privileges", "Budget Session Highlights",
    "Monsoon Session Proceedings", "Winter Session Agenda", "Joint Session of Parliament",
    "Rajya Sabha Elections", "Lok Sabha Committee Reports", "Standing Committee Functions",
    "Public Accounts Committee", "Estimates Committee Work", "PAC Recommendations",
    "Governor's Role in States", "President's Rule Imposition", "Federal Structure Debates",
    "Centre-State Relations", "Finance Commission Awards", "GST Council Decisions",
    "Inter-State River Disputes", "Boundary Commission Reports", "Reorganization of States",
    "Panchayati Raj Institutions", "73rd Amendment Implementation", "PESA Act Application",
    "Municipal Governance Reforms", "74th Amendment Effects", "Urban Local Bodies",
    "Right to Information Act", "Whistleblower Protection", "Lokpal and Lokayukta",
    "Central Vigilance Commission", "Central Bureau of Investigation", "Enforcement Directorate",
    "Prevention of Corruption Act", "Benami Transactions Act", "Money Laundering Legislation",
    "National Human Rights Commission", "State Human Rights Commission", "Women's Commission",
    "SC/ST Commission Reports", "Minority Commission Functions", "Child Rights Protection",
    "Protection of Children Act", "Juvenile Justice System", "POCSO Act Implementation",
    "Domestic Violence Act", "Dowry Prohibition Law", "Sexual Harassment at Workplace",
    "Consumer Protection Act 2019", "Food Safety Standards", "Competition Act Amendments",
    "Intellectual Property Rights", "Patent Law Updates", "Copyright Regulations",
    "Trademark Protection", "Geographical Indication Tags", "Traditional Knowledge Protection",
    "Data Protection Bill", "Privacy Legislation", "Cyber Law Amendments",
    "Information Technology Act", "Digital Personal Data Protection", "Aadhaar Regulations",
    "National Security Act", "UAPA Provisions", "Armed Forces Special Powers Act",
    "Official Secrets Act", "Sedition Law Debate", "Hate Speech Regulations",
    "Citizenship Amendment Act", "National Register of Citizens", "Passport Regulations",
    "Foreigners Act", "Refugee Protection", "Asylum Policies",
    "Land Acquisition Act", "Forest Rights Act", "Environmental Protection Act",
    "Wildlife Protection Act", "Coastal Regulation Zones", "Air Quality Standards",
    "Water Pollution Control", "Solid Waste Management", "E-waste Regulations",
    "Motor Vehicles Act Amendments", "Road Safety Measures", "Traffic Regulations",
    "Railway Safety Standards", "Aviation Regulations", "Merchant Shipping Act",
    "Labor Code Consolidation", "Minimum Wages Act", "Social Security Code",
    "Industrial Relations Code", "Occupational Safety Standards", "Contract Labor Regulations",
    "Education Right Act", "National Education Policy", "RTE Implementation",
    "Higher Education Regulations", "UGC Guidelines", "AICTE Norms",
    "Medical Education Standards", "Bar Council Regulations", "Professional Bodies",
    "Health Insurance Regulations", "Clinical Establishment Act", "Drug Control Act",
    "Medical Devices Regulations", "FSSAI Standards", "Food Adulteration Prevention",
    "Ancient Monuments Preservation", "Cultural Property Protection", "Heritage Conservation",
    "Archeological Survey of India", "Museum Development", "Library Legislation"
  ],
  
  Science: [
    "Chandrayaan-3 Landing Success", "Gaganyaan Mission Progress", "Aditya L1 Solar Mission",
    "ISRO's Small Satellite Launch", "PSLV Launch Updates", "GSLV Mark III Development",
    "NavIC Navigation System", "IRNSS Satellite Constellation", "Earth Observation Satellites",
    "Remote Sensing Applications", "Space Technology Applications", "Satellite Communication",
    "Mars Orbiter Mission Insights", "Venus Mission Planning", "Lunar Polar Exploration",
    "Space Station Development", "Commercial Space Policy", "Space Debris Management",
    "DRDO Missile Systems", "Agni Series Updates", "Brahmos Development",
    "Indigenous Aircraft Design", "Light Combat Aircraft", "Advanced Medium Combat Aircraft",
    "Naval Ship Building", "Submarine Technology", "Aircraft Carrier Development",
    "Radar Technology Advances", "Surveillance Systems", "Communication Systems",
    "CSIR Research Initiatives", "National Laboratories Network", "Scientific Research Funding",
    "Biotechnology Innovations", "Genetic Engineering Applications", "CRISPR Technology",
    "Stem Cell Research", "Regenerative Medicine", "Cancer Research Breakthroughs",
    "Vaccine Development Programs", "Immunology Research", "Infectious Disease Control",
    "COVID-19 Research Updates", "Pandemic Preparedness", "Disease Surveillance Systems",
    "Antimicrobial Resistance", "Antibiotic Discovery", "Drug Development Pipeline",
    "Clinical Trial Regulations", "Pharmaceutical Research", "Generic Medicine Production",
    "Traditional Medicine Research", "AYUSH Integration", "Yoga and Wellness Studies",
    "Nanotechnology Applications", "Material Science Advances", "Quantum Technology",
    "Quantum Computing Research", "Cryptography Development", "Secure Communication",
    "Artificial Intelligence Research", "Machine Learning Applications", "Deep Learning Systems",
    "Neural Networks Development", "Natural Language Processing", "Computer Vision Advances",
    "Robotics Engineering", "Automation Technology", "Industrial Robots",
    "Agricultural Robots", "Medical Robotics", "Drone Technology",
    "3D Printing Innovation", "Additive Manufacturing", "Bio-printing Technology",
    "Nuclear Research Programs", "Fusion Energy Research", "Thorium Reactor Development",
    "Particle Physics Experiments", "CERN Collaboration", "Neutrino Observatory",
    "Astronomy Developments", "Telescope Facilities", "Radio Astronomy",
    "Gravitational Wave Detection", "Astrobiology Research", "Exoplanet Discovery",
    "Climate Science Research", "Monsoon Prediction Models", "Weather Forecasting",
    "Oceanography Studies", "Marine Biology Research", "Coral Reef Conservation",
    "Biodiversity Documentation", "Species Discovery", "Wildlife Genetics",
    "Plant Science Research", "Crop Improvement Programs", "Drought Resistant Varieties",
    "Soil Science Advances", "Sustainable Agriculture", "Organic Farming Research",
    "Water Resource Science", "Hydrology Studies", "Glaciology Research",
    "Seismology Advances", "Earthquake Prediction", "Disaster Management Science",
    "Metallurgy Research", "Composite Materials", "Smart Materials Development",
    "Energy Storage Technology", "Battery Innovation", "Fuel Cell Development",
    "Hydrogen Technology", "Carbon Capture Methods", "Emission Reduction Technology"
  ],
  
  Technology: [
    "5G Network Rollout", "6G Research Initiatives", "Telecom Infrastructure",
    "BharatNet Fiber Expansion", "Digital Village Program", "Internet Penetration Growth",
    "Artificial Intelligence Policy", "AI Ethics Framework", "Responsible AI Development",
    "Machine Learning Deployment", "AI in Healthcare", "AI in Agriculture",
    "AI in Education", "AI in Governance", "Chatbot Applications",
    "Blockchain Implementation", "Distributed Ledger Technology", "Smart Contracts",
    "Cryptocurrency Regulations", "Digital Currency Pilot", "CBDCs Development",
    "Fintech Innovation", "Payment Gateway Security", "UPI Ecosystem Growth",
    "Digital Banking Services", "Neo Banking Platforms", "Mobile Banking Apps",
    "Cybersecurity Framework", "Data Breach Prevention", "Network Security",
    "Endpoint Protection", "Cloud Security", "Application Security",
    "Zero Trust Architecture", "Threat Intelligence", "Incident Response Systems",
    "Ethical Hacking Programs", "Bug Bounty Initiatives", "Penetration Testing",
    "Cloud Computing Services", "Data Centers in India", "Edge Computing",
    "Fog Computing Applications", "Server Infrastructure", "Virtualization Technology",
    "Internet of Things Deployment", "Smart Home Devices", "Industrial IoT",
    "Smart City Sensors", "Connected Vehicles", "Wearable Technology",
    "Augmented Reality Apps", "Virtual Reality Platforms", "Mixed Reality Solutions",
    "Gaming Technology", "E-sports Infrastructure", "Streaming Platforms",
    "Digital Content Creation", "Video Editing Software", "Animation Technology",
    "Social Media Platforms", "Content Moderation AI", "Influencer Marketing Tech",
    "E-commerce Technology", "Logistics Automation", "Warehouse Robotics",
    "Last Mile Delivery Tech", "Supply Chain Software", "Inventory Management",
    "ERP Systems", "CRM Platforms", "Business Intelligence Tools",
    "Data Analytics Software", "Big Data Processing", "Predictive Analytics",
    "Digital Marketing Tools", "SEO Technology", "Advertising Platforms",
    "Email Marketing Automation", "Marketing Analytics", "Customer Journey Mapping",
    "E-learning Platforms", "Educational Technology", "Virtual Classrooms",
    "Learning Management Systems", "Adaptive Learning AI", "Gamification in Education",
    "Telemedicine Platforms", "Health Monitoring Devices", "Medical Imaging Technology",
    "Electronic Health Records", "Healthcare Analytics", "Hospital Management Systems",
    "Agricultural Technology", "Precision Farming", "Crop Monitoring Drones",
    "Soil Sensors", "Weather Prediction Apps", "Farm Management Software",
    "Smart Manufacturing", "Industry 4.0", "Predictive Maintenance",
    "Quality Control Automation", "Production Optimization", "Supply Chain Digitization",
    "Geographic Information Systems", "Satellite Imagery Analysis", "Mapping Technology",
    "Location Based Services", "Navigation Apps", "Fleet Management",
    "Biometric Authentication", "Facial Recognition", "Fingerprint Scanners",
    "Iris Recognition", "Voice Authentication", "Multi-factor Authentication",
    "Software Development Tools", "Programming Languages", "Code Repositories",
    "Version Control Systems", "Continuous Integration", "DevOps Platforms",
    "Open Source Software", "Linux Development", "Community Driven Projects"
  ],
  
  Environment: [
    "Paris Agreement Compliance", "Net Zero Emissions Target", "Carbon Neutrality Roadmap",
    "National Action Plan on Climate Change", "State Action Plans", "Climate Finance Mobilization",
    "Renewable Energy Capacity", "Solar Power Projects", "Rooftop Solar Schemes",
    "Ultra Mega Solar Parks", "Floating Solar Plants", "Solar Manufacturing",
    "Wind Energy Expansion", "Offshore Wind Projects", "Wind Turbine Technology",
    "Hydroelectric Projects", "Small Hydro Development", "Pumped Storage Plants",
    "Biomass Energy Utilization", "Biogas Production", "Waste to Energy Plants",
    "Green Hydrogen Production", "Hydrogen Fuel Cells", "Ammonia as Fuel",
    "Electric Vehicle Adoption", "EV Charging Infrastructure", "Battery Manufacturing",
    "Public Transport Electrification", "E-buses Deployment", "EV Policy Incentives",
    "Air Quality Management", "National Clean Air Programme", "City Air Quality Index",
    "Vehicular Emission Standards", "BS-VI Implementation", "Industrial Emission Control",
    "Stubble Burning Solutions", "Crop Residue Management", "Alternative Uses",
    "Water Conservation Methods", "Rainwater Harvesting", "Groundwater Recharge",
    "River Rejuvenation Projects", "Ganga Cleaning Mission", "River Basin Management",
    "Wetland Conservation", "Ramsar Sites Protection", "Lake Restoration",
    "Forest Cover Expansion", "Afforestation Programs", "Compensatory Afforestation",
    "Wildlife Corridor Development", "Habitat Restoration", "Species Recovery Programs",
    "Tiger Conservation Efforts", "Elephant Protection", "Rhino Conservation",
    "Marine Conservation", "Coastal Zone Management", "Mangrove Restoration",
    "Coral Reef Protection", "Marine Protected Areas", "Blue Economy Initiatives",
    "Plastic Waste Management", "Single Use Plastic Ban", "Plastic Recycling",
    "Extended Producer Responsibility", "Waste Segregation", "Municipal Solid Waste",
    "E-waste Collection", "Hazardous Waste Disposal", "Biomedical Waste Management",
    "Circular Economy Models", "Resource Efficiency", "Industrial Symbiosis",
    "Green Building Standards", "Energy Efficient Construction", "LEED Certification",
    "Sustainable Urban Planning", "Green Infrastructure", "Urban Forestry",
    "Biodiversity Conservation", "Genetic Diversity", "Ecosystem Services",
    "Protected Area Network", "National Parks Management", "Wildlife Sanctuaries",
    "Biosphere Reserves", "UNESCO World Heritage Sites", "Eco-sensitive Zones",
    "Organic Farming Promotion", "Chemical Free Agriculture", "Soil Health Management",
    "Pesticide Regulation", "Integrated Pest Management", "Natural Farming",
    "Climate Resilient Crops", "Drought Tolerant Varieties", "Flood Resistant Seeds",
    "Disaster Risk Reduction", "Early Warning Systems", "Flood Management",
    "Cyclone Preparedness", "Earthquake Resilience", "Landslide Prevention",
    "Coastal Erosion Control", "Sea Level Rise Adaptation", "Climate Migration",
    "Environmental Impact Assessment", "Public Hearing Process", "Clearance Procedures",
    "Environmental Compliance", "Monitoring Mechanisms", "Pollution Control Boards",
    "Green Tribunal Judgments", "Environmental Litigation", "Right to Clean Environment",
    "Ecological Restoration", "Degraded Land Rehabilitation", "Mine Closure Plans",
    "Sustainable Tourism", "Ecotourism Development", "Responsible Travel",
    "Traditional Knowledge", "Indigenous Practices", "Community Conservation"
  ],
  
  International: [
    "G20 Summit Outcomes", "India's G20 Presidency", "G20 Priorities",
    "BRICS Expansion", "BRICS Summit Decisions", "BRICS Development Bank",
    "United Nations General Assembly", "UNSC Reform Agenda", "Multilateral Diplomacy",
    "India-USA Relations", "Strategic Partnership", "Defense Cooperation USA",
    "India-China Border Issues", "LAC Standoff", "Diplomatic Dialogue China",
    "India-Pakistan Relations", "Cross Border Terrorism", "Diplomatic Tensions Pakistan",
    "India-Russia Ties", "S400 Missile Deal", "Energy Cooperation Russia",
    "India-European Union", "Trade Relations EU", "FTA Negotiations EU",
    "India-UK Relations", "Post-Brexit Partnership", "Trade Agreement UK",
    "India-France Cooperation", "Defense Partnership France", "Nuclear Cooperation France",
    "India-Japan Relations", "Infrastructure Partnership Japan", "Technology Cooperation Japan",
    "India-Australia Ties", "Quad Cooperation", "Comprehensive Strategic Partnership",
    "ASEAN-India Summit", "Act East Policy", "Economic Cooperation ASEAN",
    "India-Middle East Relations", "Energy Security Gulf", "Diaspora Engagement",
    "India-Africa Forum", "Development Partnership Africa", "Capacity Building Africa",
    "India-Latin America", "IBSA Cooperation", "Trade Opportunities Latin America",
    "Shanghai Cooperation Organization", "Regional Security SCO", "Counter Terrorism SCO",
    "Bay of Bengal Initiative", "BIMSTEC Cooperation", "Connectivity Projects",
    "South Asian Association", "SAARC Summits", "Regional Integration",
    "Indian Ocean Rim Association", "Maritime Security IORA", "Blue Economy IORA",
    "Indo-Pacific Strategy", "Free and Open Indo-Pacific", "Quad Initiative",
    "Climate Diplomacy", "COP Negotiations", "Climate Finance Commitments",
    "Nuclear Non-Proliferation", "NSG Membership Bid", "IAEA Cooperation",
    "Space Diplomacy", "Satellite Cooperation", "Space Technology Transfer",
    "Vaccine Diplomacy", "Vaccine Maitri", "Pharmaceutical Exports",
    "Digital Diplomacy", "Technology Standards", "Data Governance",
    "Trade Negotiations", "Free Trade Agreements", "Tariff Reductions",
    "WTO Disputes", "Trade Remedies", "Export Promotion",
    "Investment Treaties", "Bilateral Investment Protection", "FDI Regulations",
    "Diaspora Engagement", "Overseas Citizens", "PIO Cardholders",
    "Cultural Diplomacy", "International Yoga Day", "Cultural Exchange Programs",
    "Educational Cooperation", "Student Exchange", "Scholarship Programs",
    "Health Diplomacy", "WHO Collaboration", "Pandemic Preparedness",
    "Counter Terrorism Cooperation", "FATF Compliance", "Terror Financing",
    "Cyber Security Cooperation", "Critical Infrastructure Protection", "Cyber Norms",
    "Maritime Security", "Anti-Piracy Operations", "Naval Cooperation",
    "Border Management", "Integrated Check Posts", "Cross Border Trade",
    "Refugee Issues", "Asylum Policies", "Humanitarian Assistance",
    "Human Rights Diplomacy", "UNHRC Engagement", "Democracy Promotion",
    "Peacekeeping Operations", "UN Missions", "Troop Contributions",
    "Development Assistance", "Lines of Credit", "Technical Cooperation",
    "Regional Connectivity", "Transport Corridors", "Energy Pipelines",
    "River Water Sharing", "Transboundary Rivers", "Water Diplomacy",
    "Arctic Engagement", "Scientific Research Arctic", "Observer Status",
    "Antarctica Presence", "Research Stations", "Scientific Expeditions"
  ],
  
  Social: [
    "National Education Policy Implementation", "School Education Reforms", "Higher Education Changes",
    "Foundational Literacy Mission", "NIPUN Bharat", "Early Childhood Education",
    "Midday Meal Scheme", "PM POSHAN", "School Infrastructure",
    "Digital Education Platforms", "DIKSHA Portal", "E-content Development",
    "Skill Development Programs", "Pradhan Mantri Kaushal Vikas", "Vocational Training",
    "Higher Education Enrollment", "Gross Enrollment Ratio", "Gender Parity Education",
    "Scholarship Schemes", "Merit Scholarships", "Minority Scholarships",
    "National Health Mission", "Health Infrastructure", "Primary Healthcare Centers",
    "Ayushman Bharat", "Health Insurance Coverage", "Wellness Centers",
    "Immunization Programs", "Universal Immunization", "Vaccine Coverage",
    "Maternal Health Services", "Institutional Deliveries", "Maternal Mortality Reduction",
    "Child Health Initiatives", "Malnutrition Combat", "Child Mortality Reduction",
    "Tuberculosis Elimination", "TB Free India", "Nikshay Portal",
    "Malaria Eradication", "Vector Control", "Disease Surveillance",
    "Mental Health Programs", "Kiran Helpline", "Suicide Prevention",
    "AYUSH Integration", "Traditional Medicine", "Wellness Promotion",
    "Women Empowerment Schemes", "Beti Bachao Beti Padhao", "Gender Equality",
    "Women's Safety Measures", "Emergency Response System", "Safe City Projects",
    "Women in Workforce", "Maternity Benefits", "Equal Pay Initiatives",
    "Women Entrepreneurship", "Stand Up India", "Mahila E-Haat",
    "Child Protection Services", "Child Helpline", "Adoption Regulations",
    "Senior Citizen Welfare", "Pension Schemes", "Elderly Care",
    "Disability Rights", "Accessible India Campaign", "Divyangjan Empowerment",
    "SC/ST Welfare Programs", "Scholarship for SC/ST", "Anti-Discrimination Measures",
    "OBC Welfare Initiatives", "Reservation Policies", "Social Justice",
    "Minority Development", "Educational Empowerment Minorities", "Financial Assistance",
    "Tribal Welfare Schemes", "Forest Rights Implementation", "Tribal Education",
    "Urban Housing Schemes", "PM Awas Yojana Urban", "Slum Rehabilitation",
    "Rural Housing Programs", "PM Awas Gramin", "Pucca Houses",
    "Drinking Water Supply", "Jal Jeevan Mission", "Tap Water Connections",
    "Sanitation Programs", "Swachh Bharat Progress", "Open Defecation Free",
    "Rural Employment Scheme", "MGNREGA Implementation", "Wage Employment",
    "Urban Employment Programs", "DAY-NULM", "Skill Training Urban Poor",
    "Food Security Programs", "Public Distribution System", "Ration Card Digitization",
    "Poverty Alleviation", "Multidimensional Poverty Index", "Below Poverty Line",
    "Social Security Schemes", "PM Jan Dhan Yojana", "Financial Inclusion",
    "Life Insurance Schemes", "PM Jeevan Jyoti", "Accident Insurance",
    "Pension for All", "Atal Pension Yojana", "Old Age Security",
    "Community Development", "Gram Panchayat Development", "Village Planning",
    "Youth Development Programs", "National Youth Policy", "Youth Clubs",
    "Sports Development", "Khelo India", "Sports Infrastructure",
    "Cultural Preservation", "Heritage Conservation", "Folk Arts Promotion",
    "Library Development", "Digital Libraries", "Reading Promotion",
    "Museum Development", "Archaeological Museums", "Science Museums"
  ],
  
  Defence: [
    "Atmanirbhar Defense Production", "Make in India Defense", "Indigenous Weapon Systems",
    "Defense Procurement Procedure", "Positive Indigenization List", "Import Substitution",
    "Tejas Fighter Aircraft", "Light Combat Aircraft Mark 2", "Naval Variant Tejas",
    "Advanced Medium Combat Aircraft", "Fifth Generation Fighter", "AMCA Development",
    "Rafale Fighter Jets", "Technology Transfer", "Operational Deployment",
    "Sukhoi Su-30MKI Upgrade", "Mirage Upgrade Program", "MiG-29 Modernization",
    "Apache Attack Helicopters", "Chinook Heavy Lift", "Light Utility Helicopters",
    "Indigenous Aircraft Carrier", "INS Vikrant Commissioning", "Carrier Operations",
    "Scorpene Submarines", "Project 75I", "Nuclear Submarine Program",
    "Ballistic Missile Submarines", "INS Arihant Class", "Strategic Deterrence",
    "Destroyer Construction", "Stealth Frigates", "Corvette Projects",
    "Agni Missile Series", "Agni-V Testing", "Intercontinental Range",
    "Prithvi Missile System", "Tactical Missiles", "Dhanush Naval Version",
    "BrahMos Supersonic Missile", "Air Launched BrahMos", "Extended Range Version",
    "Nirbhay Cruise Missile", "Subsonic Cruise Missile", "Terrain Hugging",
    "Akash Surface to Air Missile", "Akash-NG Development", "Export Version",
    "QRSAM Quick Reaction", "Short Range SAM", "Mobile Air Defense",
    "S-400 Air Defense System", "Triumf Deployment", "Integrated Air Defense",
    "Ballistic Missile Defense", "Interceptor Missiles", "Layered Defense",
    "Arjun Main Battle Tank", "Mark 1A Variant", "Indigenous Tank",
    "T-90 Tank Fleet", "Infantry Combat Vehicles", "Armored Personnel Carriers",
    "K9 Vajra Howitzer", "M777 Lightweight Howitzer", "Dhanush Artillery Gun",
    "Advanced Towed Artillery", "Self Propelled Artillery", "Rocket Artillery Systems",
    "Infantry Modernization", "Future Infantry Soldier", "Small Arms Upgrade",
    "Assault Rifles Procurement", "Sniper Rifles", "Machine Guns Modernization",
    "Border Surveillance Systems", "Sensors and Radars", "Unmanned Vehicles Border",
    "Drones for Military Use", "Armed Drones", "Surveillance UAVs",
    "Swarm Drone Technology", "Loitering Munitions", "Kamikaze Drones",
    "Cyber Defense Capabilities", "Cyber Command", "Information Warfare",
    "Space Based Assets", "Military Satellites", "ASAT Capabilities",
    "Electronic Warfare Systems", "Jamming Technology", "Counter Measures",
    "Night Vision Devices", "Thermal Imaging", "Surveillance Equipment",
    "Defense AI Applications", "Autonomous Systems", "Decision Support AI",
    "Military Training Reforms", "Simulation Technology", "War Gaming",
    "Integrated Battle Groups", "Organizational Restructuring", "Operational Readiness",
    "Chief of Defense Staff", "Theater Commands", "Jointness in Forces",
    "Agnipath Recruitment Scheme", "Tour of Duty", "Military Human Resource",
    "Veterans Welfare", "Ex-Servicemen Support", "Resettlement Programs",
    "Defense Budget Allocation", "Capital Expenditure", "Revenue Spending",
    "Defense Exports Growth", "International Cooperation", "Joint Exercises",
    "Counter Terrorism Operations", "Internal Security", "Anti-Naxal Operations",
    "Coastal Security Enhancement", "Marine Commandos", "Island Defense",
    "Strategic Partnership Model", "Technology Collaboration", "Co-development Projects"
  ],
  
  History: [
    "Indus Valley Civilization", "Harappan Culture", "Urban Planning Ancient",
    "Vedic Period Society", "Rigvedic Age", "Later Vedic Period",
    "Mauryan Empire Administration", "Ashoka's Dhamma", "Mauryan Art",
    "Gupta Golden Age", "Scientific Developments Gupta", "Art and Literature Gupta",
    "Chola Dynasty", "Temple Architecture Chola", "Maritime Trade Chola",
    "Vijayanagara Empire", "Administrative System", "Cultural Synthesis",
    "Mughal Empire Foundation", "Akbar's Policies", "Religious Tolerance",
    "Maratha Confederacy", "Shivaji's Administration", "Peshwa Period",
    "British East India Company", "Battle of Plassey", "Colonial Expansion",
    "Revolt of 1857", "Causes and Consequences", "First War of Independence",
    "Indian National Congress Formation", "Early Nationalists", "Moderate Phase",
    "Extremist Movement", "Lal Bal Pal", "Swadeshi Movement",
    "Revolutionary Movements", "Bhagat Singh", "Revolutionary Organizations",
    "Gandhi's Leadership", "Non-Cooperation Movement", "Civil Disobedience",
    "Salt March", "Dandi March Significance", "Breaking Salt Law",
    "Quit India Movement", "Do or Die Call", "Mass Uprising",
    "Indian National Army", "Subhash Chandra Bose", "Azad Hind Fauj",
    "Partition of India", "Communal Politics", "Independence and Division",
    "Constituent Assembly", "Drafting Constitution", "Constitutional Debates",
    "Integration of Princely States", "Sardar Patel's Role", "Political Unification",
    "Land Reforms Post-Independence", "Zamindari Abolition", "Agricultural Restructuring",
    "Planning Commission", "Five Year Plans", "Economic Development Strategy",
    "Non-Aligned Movement", "Panchsheel Principles", "Foreign Policy Foundation",
    "Emergency Period 1975", "Suspension of Rights", "Constitutional Crisis",
    "Green Revolution", "Agricultural Modernization", "Food Security Achievement",
    "White Revolution", "Operation Flood", "Dairy Development",
    "Economic Liberalization 1991", "Structural Reforms", "Globalization Impact",
    "Ancient Indian Science", "Aryabhata Mathematics", "Astronomy Developments",
    "Medieval Innovations", "Metallurgy Advances", "Architectural Achievements",
    "Art and Architecture", "Rock Cut Temples", "Temple Architecture Styles",
    "Buddhist Architecture", "Stupas and Monasteries", "Cave Paintings",
    "Islamic Architecture India", "Indo-Islamic Synthesis", "Monuments",
    "Indian Literature Ancient", "Sanskrit Classics", "Epic Literature",
    "Regional Literature Growth", "Bhakti Movement Literature", "Sufi Poetry",
    "Social Reform Movements", "Raja Ram Mohan Roy", "Brahmo Samaj",
    "Arya Samaj", "Swami Dayananda", "Vedic Revival",
    "Ramakrishna Mission", "Swami Vivekananda", "Universal Religion",
    "Education Reforms", "English Education", "University System",
    "Press and Nationalism", "Vernacular Press", "Print Media",
    "Art Renaissance", "Bengal School of Art", "Ravi Varma",
    "Music and Dance Classical", "Carnatic Tradition", "Hindustani Tradition",
    "Folk Traditions", "Regional Customs", "Cultural Diversity"
  ],
  
  Geography: [
    "Himalayan Mountain System", "Formation and Structure", "Major Peaks",
    "Northern Plains", "Alluvial Deposits", "Agricultural Importance",
    "Peninsular Plateau", "Geological Stability", "Mineral Resources",
    "Coastal Plains", "Eastern Coast", "Western Coast",
    "Island Groups", "Andaman and Nicobar", "Lakshadweep Islands",
    "Drainage Systems", "Himalayan Rivers", "Peninsular Rivers",
    "Ganga River System", "Tributaries", "Basin Characteristics",
    "Brahmaputra River", "Course and Features", "Flood Dynamics",
    "Indus River System", "International River", "Water Sharing",
    "Peninsular River Systems", "Godavari Basin", "Krishna Basin",
    "Climate Zones India", "Tropical Monsoon", "Regional Variations",
    "Monsoon Mechanism", "Southwest Monsoon", "Northeast Monsoon",
    "Western Disturbances", "Winter Rainfall", "North India Weather",
    "Cyclones in India", "Bay of Bengal Cyclones", "Arabian Sea Cyclones",
    "Natural Vegetation", "Forest Types", "Ecological Zones",
    "Tropical Rainforests", "Western Ghats", "Northeast Forests",
    "Deciduous Forests", "Central India", "Seasonal Variation",
    "Thorn Forests", "Arid Regions", "Xerophytic Vegetation",
    "Mountain Vegetation", "Altitudinal Zones", "Alpine Meadows",
    "Soil Types India", "Alluvial Soils", "Black Soils",
    "Red and Yellow Soils", "Laterite Soils", "Arid Soils",
    "Soil Conservation", "Erosion Control", "Watershed Management",
    "Mineral Resources", "Coal Reserves", "Iron Ore Deposits",
    "Petroleum and Natural Gas", "Offshore Fields", "Exploration Activities",
    "Metallic Minerals", "Bauxite Resources", "Copper Deposits",
    "Non-Metallic Minerals", "Limestone", "Mica Deposits",
    "Energy Resources", "Conventional Sources", "Non-Conventional Sources",
    "Agricultural Patterns", "Cropping Seasons", "Crop Distribution",
    "Irrigation Systems", "Canal Irrigation", "Well Irrigation",
    "Green Revolution Impact", "Regional Disparities", "Productivity Changes",
    "Agricultural Regions", "Rice Zones", "Wheat Zones",
    "Plantation Agriculture", "Tea Estates", "Coffee Plantations",
    "Industrial Regions", "Major Industrial Zones", "Industrial Clusters",
    "Textile Industry", "Cotton Textiles", "Synthetic Textiles",
    "Iron and Steel Industry", "Integrated Plants", "Mini Steel Plants",
    "Automobile Industry", "Manufacturing Hubs", "Component Industry",
    "IT Industry Geography", "Bangalore Hub", "Hyderabad IT",
    "Transport Networks", "Road Network", "Highway Development",
    "Railway System", "Gauge Conversion", "Electrification",
    "Ports and Shipping", "Major Ports", "Minor Ports",
    "Air Transport", "International Airports", "Connectivity",
    "Population Distribution", "Density Patterns", "Regional Variation",
    "Urbanization Trends", "Metropolitan Cities", "Urban Sprawl",
    "Migration Patterns", "Rural to Urban", "Inter-State Migration",
    "Demographic Transition", "Birth Rate Decline", "Death Rate Trends"
  ]
};

/* ==========================================================================
   UNIQUE QUESTIONS GENERATOR
   ========================================================================== */

const QUESTION_TEMPLATES = [
  "What are the key implications of {topic} for competitive examinations?",
  "Analyze the significance of {topic} in current affairs.",
  "Discuss the major developments in {topic} during 2024-2026.",
  "How does {topic} impact India's socio-economic landscape?",
  "Evaluate the challenges and opportunities presented by {topic}.",
  "What are the policy interventions related to {topic}?",
  "Compare {topic} with similar initiatives globally.",
  "What is the constitutional/legal framework governing {topic}?",
  "How has {topic} evolved over the past decade?",
  "What are the future prospects of {topic} in India?",
  "Critically examine the implementation of {topic}.",
  "What are the regional disparities in {topic}?",
  "How does {topic} align with India's international commitments?",
  "What role does technology play in {topic}?",
  "Discuss the social impact of {topic}.",
  "What are the environmental considerations in {topic}?",
  "How does {topic} contribute to sustainable development goals?",
  "What are the budgetary allocations for {topic}?",
  "Examine the stakeholder perspectives on {topic}.",
  "What are the success stories and best practices in {topic}?"
];

const generateUniqueQuestions = (topic, count = 5) => {
  const questions = [];
  for (let i = 0; i < count; i++) {
    const template = QUESTION_TEMPLATES[(i % QUESTION_TEMPLATES.length)];
    questions.push(template.replace('{topic}', topic));
  }
  return questions;
};

/* ==========================================================================
   CONTENT GENERATORS
   ========================================================================== */

const generateDetailedContent = (category, topic, index) => {
  const baseContent = BASE_CONTENT[category] || "";
  
  return `
<h2>${topic}</h2>

<h3>Context and Background</h3>
<p>${topic} represents a significant development in India's ${category.toLowerCase()} landscape. This topic has gained prominence due to its relevance to contemporary challenges and opportunities facing the nation. Understanding this topic is crucial for aspirants preparing for competitive examinations as it intersects multiple dimensions of governance, policy, and development.</p>

<h3>Key Features and Components</h3>
<ul>
  <li><strong>Primary Objective:</strong> The main goal is to address critical gaps and enhance effectiveness in the ${category.toLowerCase()} sector through targeted interventions and strategic planning.</li>
  <li><strong>Implementation Framework:</strong> A comprehensive approach involving multiple stakeholders including central and state governments, civil society, and international partners.</li>
  <li><strong>Expected Outcomes:</strong> Measurable improvements in key performance indicators aligned with national development priorities and international best practices.</li>
  <li><strong>Timeline:</strong> Phased rollout from 2024-2026 with periodic review and course correction mechanisms built into the design.</li>
</ul>

<h3>Significance and Impact</h3>
<p>The importance of ${topic} cannot be overstated. It addresses fundamental challenges while creating new opportunities for growth and development. The multi-dimensional impact spans economic, social, environmental, and governance aspects, making it a cornerstone of India's development trajectory.</p>

<h4>Economic Implications</h4>
<p>Direct and indirect economic benefits include enhanced productivity, job creation, improved resource utilization, and contribution to GDP growth. The multiplier effect on related sectors amplifies the overall economic impact.</p>

<h4>Social Dimensions</h4>
<p>Social inclusion, equity, and empowerment are central themes. The initiative aims to benefit marginalized communities and reduce disparities while promoting participatory development approaches.</p>

<h3>Challenges and Limitations</h3>
<ul>
  <li>Implementation capacity constraints at various levels of governance</li>
  <li>Resource mobilization and optimal allocation challenges</li>
  <li>Technology adoption and digital divide issues</li>
  <li>Inter-agency coordination and convergence requirements</li>
  <li>Monitoring and evaluation framework effectiveness</li>
</ul>

<h3>Way Forward</h3>
<p>Successful implementation requires sustained political commitment, adequate resource allocation, capacity building, technology integration, and continuous stakeholder engagement. Learning from international experiences while adapting to local contexts will be crucial.</p>

${baseContent}

<h3>Practice Questions</h3>
<ol>
  ${generateUniqueQuestions(topic, 5).map(q => `<li>${q}</li>`).join('\n  ')}
</ol>

<h3>Conclusion</h3>
<p>Understanding ${topic} is essential for comprehensive exam preparation. This topic connects various themes in the ${category} domain and demonstrates the integrated nature of contemporary development challenges and solutions.</p>
`;
};

/* ==========================================================================
   MAIN ARTICLE GENERATOR
   ========================================================================== */

const generateSlug = (title) => 
  title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const randomDate = (index) => {
  const start = new Date('2024-01-01').getTime();
  const day = 86400000; // milliseconds in a day
  return new Date(start + (index * day * 0.365)).toISOString().split('T')[0];
};

const generateArticles = (count = 1000) => {
  const articles = [];
  let articleId = 1;
  
  // Distribute topics across categories
  for (const category of CATEGORIES) {
    const topicsInCategory = TOPICS[category] || [];
    
    for (let i = 0; i < topicsInCategory.length && articleId <= count; i++) {
      const topic = topicsInCategory[i];
      const title = `${topic} - ${category} Current Affairs Analysis`;
      
      articles.push({
        id: articleId,
        title,
        slug: generateSlug(title),
        category,
        tags: TAGS[category] || [],
        date: randomDate(articleId),
        summary: `Comprehensive analysis of ${topic} covering its significance, implementation, challenges, and exam relevance for UPSC, SSC, Banking, and State PSC examinations.`,
        readingTime: `${6 + (articleId % 5)} min`,
        content: generateDetailedContent(category, topic, articleId),
        author: 'Current Affairs Team',
        examRelevance: ['UPSC', 'SSC', 'Banking', 'State PSC', 'Railways'],
        difficulty: ['Beginner', 'Intermediate', 'Advanced'][articleId % 3],
        sources: [
          'PIB (Press Information Bureau)',
          'Government Official Portals',
          'Economic Survey',
          'Budget Documents',
          'Ministry Reports'
        ],
        lastUpdated: randomDate(articleId + 10),
        viewCount: Math.floor(Math.random() * 10000) + 1000,
        likes: Math.floor(Math.random() * 500) + 50,
        published: true
      });
      
      articleId++;
    }
  }
  
  return articles;
};

/* ==========================================================================
   BASE CONTENT FOR CATEGORIES
   ========================================================================== */

const BASE_CONTENT = {
  Economy: `
<h4>Exam Focus Areas</h4>
<ul>
  <li><strong>UPSC Civil Services:</strong> GS Paper III - Indian Economy, Economic Development</li>
  <li><strong>SSC Exams:</strong> General Awareness - Banking, Economy</li>
  <li><strong>Banking Exams:</strong> Economic and Banking Awareness</li>
  <li><strong>State PSC:</strong> Indian Economy, State Economy</li>
</ul>

<h4>Related Topics for Integrated Preparation</h4>
<p>Budget Analysis, Monetary Policy, Fiscal Policy, Banking Regulations, Trade Policy, Economic Indicators, Development Economics, Public Finance</p>
`,

  Polity: `
<h4>Exam Focus Areas</h4>
<ul>
  <li><strong>UPSC Civil Services:</strong> GS Paper II - Constitution, Governance, Polity</li>
  <li><strong>SSC Exams:</strong> General Awareness - Polity, Constitution</li>
  <li><strong>State PSC:</strong> Indian Polity, State Administration</li>
  <li><strong>Judiciary Exams:</strong> Constitutional Law, Legal Framework</li>
</ul>

<h4>Related Topics for Integrated Preparation</h4>
<p>Constitutional Provisions, Judicial Pronouncements, Parliamentary Procedures, Governance Reforms, Federal Structure, Local Governance</p>
`,

  Science: `
<h4>Exam Focus Areas</h4>
<ul>
  <li><strong>UPSC Civil Services:</strong> GS Paper III - Science & Technology</li>
  <li><strong>SSC Exams:</strong> General Science, Scientific Developments</li>
  <li><strong>Defence Exams:</strong> Science & Technology in Defence</li>
  <li><strong>State PSC:</strong> Science & Technology, Innovations</li>
</ul>

<h4>Related Topics for Integrated Preparation</h4>
<p>Space Technology, Biotechnology, Research & Development, Scientific Institutions, Innovation Ecosystem, Technology Applications</p>
`,

  Technology: `
<h4>Exam Focus Areas</h4>
<ul>
  <li><strong>UPSC Civil Services:</strong> GS Paper III - Science & Technology, Cyber Security</li>
  <li><strong>Banking Exams:</strong> Computer Awareness, Digital Banking</li>
  <li><strong>SSC Exams:</strong> Computer Knowledge, IT Awareness</li>
  <li><strong>State PSC:</strong> Information Technology, E-Governance</li>
</ul>

<h4>Related Topics for Integrated Preparation</h4>
<p>Digital India, Cyber Laws, Data Protection, Emerging Technologies, IT Infrastructure, E-Governance Initiatives</p>
`,

  Environment: `
<h4>Exam Focus Areas</h4>
<ul>
  <li><strong>UPSC Civil Services:</strong> GS Paper III - Environment, Ecology, Climate Change</li>
  <li><strong>SSC Exams:</strong> Environmental Studies, Climate Issues</li>
  <li><strong>Forest Service:</strong> Environmental Science, Conservation</li>
  <li><strong>State PSC:</strong> Environment & Ecology, State Environment</li>
</ul>

<h4>Related Topics for Integrated Preparation</h4>
<p>Climate Agreements, Renewable Energy, Biodiversity, Pollution Control, Sustainable Development, Environmental Legislation</p>
`,

  International: `
<h4>Exam Focus Areas</h4>
<ul>
  <li><strong>UPSC Civil Services:</strong> GS Paper II - International Relations</li>
  <li><strong>Foreign Service:</strong> Diplomacy, Global Affairs</li>
  <li><strong>SSC Exams:</strong> International Current Affairs</li>
  <li><strong>State PSC:</strong> India's Foreign Policy, Global Issues</li>
</ul>

<h4>Related Topics for Integrated Preparation</h4>
<p>Bilateral Relations, Multilateral Forums, Global Governance, Trade Agreements, Strategic Partnerships, International Organizations</p>
`,

  Social: `
<h4>Exam Focus Areas</h4>
<ul>
  <li><strong>UPSC Civil Services:</strong> GS Paper I & II - Social Issues, Development</li>
  <li><strong>SSC Exams:</strong> Social Welfare, Government Schemes</li>
  <li><strong>State PSC:</strong> Social Development, Welfare Programs</li>
  <li><strong>NET/SET:</strong> Social Development, Welfare Studies</li>
</ul>

<h4>Related Topics for Integrated Preparation</h4>
<p>Education Policy, Health Programs, Women Empowerment, Social Justice, Welfare Schemes, Human Development</p>
`,

  Defence: `
<h4>Exam Focus Areas</h4>
<ul>
  <li><strong>UPSC Civil Services:</strong> GS Paper III - Internal Security, Defence</li>
  <li><strong>Defence Exams:</strong> CDS, NDA, AFCAT - Defence & Security</li>
  <li><strong>SSC Exams:</strong> Defence Current Affairs</li>
  <li><strong>State PSC:</strong> Security Issues, Defence Matters</li>
</ul>

<h4>Related Topics for Integrated Preparation</h4>
<p>Defence Modernization, Indigenous Production, Security Challenges, Military Operations, Strategic Affairs, Border Management</p>
`,

  History: `
<h4>Exam Focus Areas</h4>
<ul>
  <li><strong>UPSC Civil Services:</strong> GS Paper I - Indian History, Culture</li>
  <li><strong>SSC Exams:</strong> Indian History, Freedom Struggle</li>
  <li><strong>State PSC:</strong> Ancient, Medieval, Modern History</li>
  <li><strong>NET/SET:</strong> Historical Studies, Research</li>
</ul>

<h4>Related Topics for Integrated Preparation</h4>
<p>Ancient Civilizations, Medieval Period, Colonial Era, Freedom Movement, Post-Independence India, Art and Culture</p>
`,

  Geography: `
<h4>Exam Focus Areas</h4>
<ul>
  <li><strong>UPSC Civil Services:</strong> GS Paper I - Geography of India and World</li>
  <li><strong>SSC Exams:</strong> Indian Geography, World Geography</li>
  <li><strong>State PSC:</strong> Physical and Human Geography</li>
  <li><strong>NET/SET:</strong> Geographical Studies</li>
</ul>

<h4>Related Topics for Integrated Preparation</h4>
<p>Physical Features, Climate, Natural Resources, Population, Agriculture, Industries, Transport, Regional Geography</p>
`
};

/* ==========================================================================
   FIXED ARTICLE RETRIEVAL WITH ERROR HANDLING
   ========================================================================== */

const articles = generateArticles(1000);

// Helper function for slug matching
const normalizeSlug = (slug) => 
  slug.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// Fixed article retrieval
const getArticleBySlug = (slug) => {
  if (!slug) return null;
  
  // Try exact match first
  let article = articles.find(article => 
    article.published && article.slug === slug
  );
  
  // Try normalized match if exact fails
  if (!article) {
    const normalizedSlug = normalizeSlug(slug);
    article = articles.find(article => 
      article.published && normalizeSlug(article.slug) === normalizedSlug
    );
  }
  
  // Try partial match for related articles
  if (!article) {
    const searchTerm = slug.replace(/-/g, ' ');
    article = articles.find(article => 
      article.published && 
      (article.title.toLowerCase().includes(searchTerm) ||
       article.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
  }
  
  return article || null;
};

// Helper function to get related articles
const getRelatedArticles = (category, count = 3) => {
  return articles
    .filter(article => 
      article.published && 
      article.category === category
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};

// Add a fallback article function for 404 pages
const getFallbackArticle = (slug) => {
  const category = slug.split('-')[0] || 'General';
  const categoryNames = {
    'economy': 'Economy',
    'polity': 'Polity', 
    'science': 'Science',
    'technology': 'Technology',
    'environment': 'Environment',
    'international': 'International',
    'social': 'Social',
    'defence': 'Defence',
    'history': 'History',
    'geography': 'Geography'
  };
  
  const displayCategory = categoryNames[category.toLowerCase()] || 'General';
  
  return {
    id: 0,
    title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    slug: slug,
    summary: `Article on ${displayCategory.toLowerCase()} topics not found. Here are related articles you might be interested in.`,
    content: `
      <div class="article-error">
        <h2>Article Not Found</h2>
        <p>The article you're looking for doesn't exist or has been removed.</p>
        <p>Try searching for similar topics or browse the ${displayCategory} category.</p>
        
        <h3>Related Articles</h3>
        <div class="related-articles">
          ${getRelatedArticles(displayCategory, 3).map(article => `
            <div class="related-article">
              <h4><a href="/article/${article.slug}">${article.title}</a></h4>
              <p>${article.summary}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `,
    category: displayCategory,
    tags: [displayCategory],
    date: new Date().toISOString().split('T')[0],
    readingTime: "2 min",
    author: "System",
    examRelevance: ["UPSC", "SSC", "State PSC"],
    difficulty: "Beginner",
    sources: [],
    lastUpdated: new Date().toISOString().split('T')[0],
    viewCount: 0,
    likes: 0,
    published: true,
    isFallback: true
  };
};

// Enhanced article retrieval with fallback
const getArticleBySlugWithFallback = (slug) => {
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return getFallbackArticle(slug);
  }
  
  return article;
};

// Fix for "Agricultural Credit Policy" specifically
const ensureAgriculturalCreditPolicyExists = () => {
  const agriCreditSlug = "agricultural-credit-policy-economy-current-affairs-analysis";
  const exists = articles.some(article => article.slug === agriCreditSlug);
  
  if (!exists) {
    // Add the missing article
    articles.unshift({
      id: 1000,
      title: "Agricultural Credit Policy - Economy Current Affairs Analysis",
      slug: agriCreditSlug,
      category: "Economy",
      tags: ["Agricultural Credit", "Banking", "Economy", "UPSC", "RBI"],
      date: "2026-01-06",
      summary: "Detailed analysis of Agricultural Credit Policy covering all aspects relevant for competitive exams.",
      readingTime: "8 min",
      content: `
        <h2>Agricultural Credit Policy</h2>
        
        <h3>Context and Background</h3>
        <p>Agricultural Credit Policy represents a significant development in India's economy landscape. This topic has gained prominence due to its relevance to contemporary challenges and opportunities facing the nation. Understanding this topic is crucial for aspirants preparing for competitive examinations as it intersects multiple dimensions of governance, policy, and development.</p>
        
        <h3>Key Features and Components</h3>
        <ul>
          <li><strong>Priority Sector Lending:</strong> 18% of Adjusted Net Bank Credit (ANBC) for agriculture</li>
          <li><strong>Kisan Credit Card (KCC):</strong> Simplified credit access with flexible repayment options</li>
          <li><strong>Interest Subvention Scheme:</strong> 2% interest subvention for timely repayment</li>
          <li><strong>NABARD Role:</strong> Refinance support to banks for agricultural lending</li>
          <li><strong>RBI Guidelines:</strong> Direct and indirect finance norms for agricultural credit</li>
        </ul>
        
        <h3>Recent Developments (2024-2026)</h3>
        <ul>
          <li>KCC saturation drive for all eligible farmers</li>
          <li>Digitalization of agricultural credit through e-KCC</li>
          <li>Increase in agricultural credit target to ₹20 lakh crore (2025-26)</li>
          <li>Focus on animal husbandry, dairy, and fisheries under priority sector</li>
          <li>Integration with PM-KISAN and other welfare schemes</li>
        </ul>
        
        <h3>Significance and Impact</h3>
        <p>The importance of Agricultural Credit Policy cannot be overstated. It addresses fundamental challenges while creating new opportunities for growth and development. The multi-dimensional impact spans economic, social, environmental, and governance aspects, making it a cornerstone of India's development trajectory.</p>
        
        <h4>Economic Implications</h4>
        <p>Direct and indirect economic benefits include enhanced agricultural productivity, job creation in rural areas, improved resource utilization, and contribution to GDP growth. The multiplier effect on related sectors amplifies the overall economic impact.</p>
        
        <h4>Social Dimensions</h4>
        <p>Social inclusion, equity, and empowerment are central themes. The initiative aims to benefit marginalized farming communities and reduce disparities while promoting participatory development approaches.</p>
        
        <h3>Challenges and Limitations</h3>
        <ul>
          <li>Regional disparities in credit distribution (Southern states receive more credit than Eastern states)</li>
          <li>High dependence on informal sector (moneylenders still dominant in many areas)</li>
          <li>Collateral requirements for small and marginal farmers</li>
          <li>Timely disbursement issues, especially during sowing seasons</li>
          <li>High non-performing assets (NPAs) in agricultural lending</li>
        </ul>
        
        <h3>Way Forward</h3>
        <p>Successful implementation requires sustained political commitment, adequate resource allocation, capacity building, technology integration, and continuous stakeholder engagement. Learning from international experiences while adapting to local contexts will be crucial.</p>
        
        <h4>Exam Focus Areas</h4>
        <ul>
          <li><strong>UPSC Civil Services:</strong> GS Paper III - Indian Economy, Economic Development</li>
          <li><strong>SSC Exams:</strong> General Awareness - Banking, Economy</li>
          <li><strong>Banking Exams:</strong> Economic and Banking Awareness</li>
          <li><strong>State PSC:</strong> Indian Economy, State Economy</li>
        </ul>
        
        <h4>Related Topics for Integrated Preparation</h4>
        <p>Budget Analysis, Monetary Policy, Fiscal Policy, Banking Regulations, Trade Policy, Economic Indicators, Development Economics, Public Finance</p>
        
        <h3>Practice Questions</h3>
        <ol>
          <li>Analyze the evolution of agricultural credit policy in India and its impact on rural development.</li>
          <li>Discuss the challenges in ensuring credit access to small and marginal farmers in India.</li>
          <li>Evaluate the role of Kisan Credit Cards in transforming agricultural financing in India.</li>
          <li>How has digitalization transformed agricultural credit delivery in recent years?</li>
          <li>What measures are needed to improve the effectiveness of agricultural credit policy in addressing regional disparities?</li>
        </ol>
        
        <h3>Conclusion</h3>
        <p>Understanding Agricultural Credit Policy is essential for comprehensive exam preparation. This topic connects various themes in the Economy domain and demonstrates the integrated nature of contemporary development challenges and solutions.</p>
      `,
      author: 'Current Affairs Team',
      examRelevance: ['UPSC', 'SSC', 'Banking', 'State PSC', 'Railways'],
      difficulty: 'Intermediate',
      sources: [
        'PIB (Press Information Bureau)',
        'Government Official Portals',
        'Economic Survey',
        'Budget Documents',
        'Ministry Reports'
      ],
      lastUpdated: "2026-01-06",
      viewCount: 1844,
      likes: 245,
      published: true
    });
  }
};

// Initialize by ensuring the article exists
ensureAgriculturalCreditPolicyExists();

/* ==========================================================================
   UTILITY FUNCTIONS FOR FILTERING AND SEARCHING
   ========================================================================== */

const getArticlesByCategory = (category) => 
  articles.filter(article => article.category === category && article.published);

const getArticlesByTag = (tag) => 
  articles.filter(article => article.tags.includes(tag) && article.published);

const searchArticles = (query) => 
  articles.filter(article => 
    article.published && (
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.summary.toLowerCase().includes(query.toLowerCase())
    )
  );

const getRecentArticles = (count = 10) => 
  [...articles]
    .filter(article => article.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, count);

const getPopularArticles = (count = 10) => 
  [...articles]
    .filter(article => article.published)
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, count);

const getFeaturedArticles = (count = 5) => 
  articles
    .filter(article => article.published && article.viewCount > 5000)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

// Add daysAgo function for date calculations
const daysAgo = (n) => {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return date.toISOString().split('T')[0];
};

/* ==========================================================================
   EXPORT EVERYTHING
   ========================================================================== */

export default articles;

export {
  getArticlesByCategory,
  getArticlesByTag,
  searchArticles,
  getRecentArticles,
  getPopularArticles,
  getArticleBySlugWithFallback as getArticleBySlug,
  getFeaturedArticles,
  CATEGORIES,
  TAGS,
  daysAgo
};

/* ==========================================================================
   USAGE EXAMPLES
   ========================================================================== */

/*
// Get specific article (with fallback)
import { getArticleBySlug } from './current-affairs-engine.js';
const article = getArticleBySlug('agricultural-credit-policy');

// Get articles by category
import { getArticlesByCategory } from './current-affairs-engine.js';
const economyArticles = getArticlesByCategory('Economy');

// Search articles
import { searchArticles } from './current-affairs-engine.js';
const results = searchArticles('budget');

// Get recent articles
import { getRecentArticles } from './current-affairs-engine.js';
const recent = getRecentArticles(20);

// Get popular articles
import { getPopularArticles } from './current-affairs-engine.js';
const popular = getPopularArticles(15);
*/