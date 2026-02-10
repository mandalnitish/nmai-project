import mongoose from "mongoose";
import Article from "./models/Article.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * ENHANCED FIX: Set specific articles to Feb 10, 2026
 * Includes all the articles you want for today
 */

// Complete list of articles that should be Feb 10, 2026 (Today)
const FEB_10_ARTICLES = [
  // Your specified 11 articles
  "Manu Bhaker Wins Silver in Asian Championship 25m Pistol",
  "Modi Announces $175 Million Seychelles Development Package",
  "ISRO Selects South Polar Site for Chandrayaan-4 Lander",
  "Delhi Partners Bharat Taxi for Cooperative Mobility Services",
  "New Dragonfly Species Lyriothemis keralensis Discovered in Kerala",
  "Visually Challenged Woman Tops Kerala Judicial Service Disability Merit List",
  "India, Netherlands Launch Hydrogen Fellowship, Expand Research Ties",
  "India, Greece Sign Pact to Boost Defence Industry Ties",
  "New Frog Species Found in Peru Faces Immediate Threat",
  "RBI Approves Vijay Anandh as City Union Bank CEO",
  "Somalia–Saudi Defence Pact Deepens Gulf Rivalries",
  
  // Additional articles from the output that might be for today
  "NSO Launches MCP Server for eSankhyiki Portal",
  "Two New Marine Worm Species Discovered off West Bengal Coast",
  "INS Arnala Strengthens India's Indigenous Naval Capability",
  "World's Longest Snake Recorded in Sulawesi, Indonesia",
  "New Trapdoor Spider Species Found in Kolhapur Grasslands",
  "Sharda River Corridor Project Launched in Champawat",
  "Centre Plans Comprehensive Development of Kondaveedu Fort",
  "India Explores New Kailash Yatra Route via Shipki La Pass",
  "New Ant Species Discovered in Guwahati's Garbhanga Forest",
  "Eurasian Otter Returns to Kashmir via LoC Waterways",
  "International Epilepsy Day 2026 Observed Globally",
  "India Clinch SAFF U-19 Women's Championship Title",
  "Chess Added to Esports Nations Cup 2026 Line-up",
  "Wool Production in India: States, Types and Industry Profile",
  "Himachal CM Launches 'Padhai with AI' Initiative",
  "Azista Space Achieves India's First In-Orbit Snooping Capability",
  "Anutin Charnvirakul Wins Thailand Snap Election",
  "Sanae Takaichi Secures Supermajority in Japan Election",
  "Arjun Ram Meghwal Launches The Medicolegal Guidebook",
  "Queensland Moves to Ban Pro-Palestinian Slogans",
  "Cardinal Poola Anthony Elected CBCI President",
  "India Ranks Second Globally in LEED-Certified Green Realty",
];

const fixDates = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");

    const feb10Date = new Date('2026-02-10T00:00:00.000Z');
    const feb9Date = new Date('2026-02-09T00:00:00.000Z');

    console.log("\n🎯 OPTION 1: Keep only the 11 specified articles on Feb 10");
    console.log("🎯 OPTION 2: Keep all 33 articles on Feb 10");
    console.log("\nℹ️  Running OPTION 1 (11 articles only)...\n");

    // Get only the first 11 articles for Feb 10
    const ONLY_11_ARTICLES = FEB_10_ARTICLES.slice(0, 11);

    // Step 1: Get all current Feb 10 articles
    const currentFeb10Articles = await Article.find({
      publishDate: {
        $gte: new Date('2026-02-10T00:00:00.000Z'),
        $lt: new Date('2026-02-11T00:00:00.000Z')
      }
    });

    console.log(`📊 Found ${currentFeb10Articles.length} articles currently dated Feb 10`);
    console.log(`🎯 Will keep ${ONLY_11_ARTICLES.length} articles on Feb 10`);
    console.log(`📅 Will move ${currentFeb10Articles.length - ONLY_11_ARTICLES.length} articles to earlier dates\n`);

    let keptCount = 0;
    let movedCount = 0;

    // Step 2: Process each article
    for (const article of currentFeb10Articles) {
      if (ONLY_11_ARTICLES.includes(article.title)) {
        // Keep this article on Feb 10
        console.log(`✅ Keeping on Feb 10: ${article.title}`);
        keptCount++;
      } else {
        // Move this article to Feb 9
        await Article.updateOne(
          { _id: article._id },
          { $set: { publishDate: feb9Date } }
        );
        console.log(`📅 Moved to Feb 9: ${article.title}`);
        movedCount++;
      }
    }

    // Step 3: Verify the fix
    const verifyFeb10 = await Article.countDocuments({
      publishDate: {
        $gte: new Date('2026-02-10T00:00:00.000Z'),
        $lt: new Date('2026-02-11T00:00:00.000Z')
      }
    });

    const verifyFeb9 = await Article.countDocuments({
      publishDate: {
        $gte: new Date('2026-02-09T00:00:00.000Z'),
        $lt: new Date('2026-02-10T00:00:00.000Z')
      }
    });

    console.log("\n" + "=".repeat(60));
    console.log("📊 FIX SUMMARY");
    console.log("=".repeat(60));
    console.log(`✅ Articles kept on Feb 10: ${keptCount} (should be 11)`);
    console.log(`📅 Articles moved to Feb 9: ${movedCount}`);
    console.log(`\n📆 Current counts:`);
    console.log(`   Feb 10, 2026 articles: ${verifyFeb10}`);
    console.log(`   Feb 9, 2026 articles: ${verifyFeb9}`);

    // Step 4: Show the Feb 10 articles
    const feb10List = await Article.find({
      publishDate: {
        $gte: new Date('2026-02-10T00:00:00.000Z'),
        $lt: new Date('2026-02-11T00:00:00.000Z')
      }
    }).select('title').sort({ title: 1 });

    console.log(`\n📋 Articles now showing as "Today" (Feb 10, 2026):`);
    feb10List.forEach((article, index) => {
      console.log(`   ${index + 1}. ${article.title}`);
    });

    if (verifyFeb10 !== 11) {
      console.log(`\n⚠️  Warning: Expected 11 articles but found ${verifyFeb10}`);
      console.log(`   Some article titles might not match exactly.`);
      console.log(`   Check the article titles in your database.`);
    }

    console.log("\n✅ Date fix completed successfully!");
    console.log("🌐 Clear browser cache and refresh your website to see the changes");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("Stack:", error.stack);
    process.exit(1);
  }
};

fixDates();