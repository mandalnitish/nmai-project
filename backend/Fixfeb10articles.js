import mongoose from "mongoose";
import Article from "./models/Article.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * FIX: Set only specific articles to Feb 10, 2026
 * Move all other Feb 10 articles to Feb 9 and shift dates accordingly
 */

// Articles that should be Feb 10, 2026 (Today)
const FEB_10_ARTICLES = [
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
];

const fixDates = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");

    const feb10Date = new Date('2026-02-10T00:00:00.000Z');
    const feb9Date = new Date('2026-02-09T00:00:00.000Z');

    // Step 1: Get all current Feb 10 articles
    const currentFeb10Articles = await Article.find({
      publishDate: {
        $gte: new Date('2026-02-10T00:00:00.000Z'),
        $lt: new Date('2026-02-11T00:00:00.000Z')
      }
    });

    console.log(`📊 Found ${currentFeb10Articles.length} articles currently dated Feb 10`);
    console.log(`🎯 Will keep ${FEB_10_ARTICLES.length} articles on Feb 10`);
    console.log(`📅 Will move ${currentFeb10Articles.length - FEB_10_ARTICLES.length} articles to earlier dates`);

    let keptCount = 0;
    let movedCount = 0;

    // Step 2: Process each article
    for (const article of currentFeb10Articles) {
      if (FEB_10_ARTICLES.includes(article.title)) {
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
    console.log(`✅ Articles kept on Feb 10: ${keptCount}`);
    console.log(`📅 Articles moved to Feb 9: ${movedCount}`);
    console.log(`\n📆 Current counts:`);
    console.log(`   Feb 10 articles: ${verifyFeb10}`);
    console.log(`   Feb 9 articles: ${verifyFeb9}`);

    // Step 4: Show the Feb 10 articles
    const feb10List = await Article.find({
      publishDate: {
        $gte: new Date('2026-02-10T00:00:00.000Z'),
        $lt: new Date('2026-02-11T00:00:00.000Z')
      }
    }).select('title');

    console.log(`\n📋 Articles now showing as Feb 10, 2026:`);
    feb10List.forEach((article, index) => {
      console.log(`   ${index + 1}. ${article.title}`);
    });

    console.log("\n✅ Date fix completed successfully!");
    console.log("🌐 Refresh your website to see the changes");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

fixDates();