import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import MCQ from "./models/MCQ.js";

// ES Module __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

/* ================= CONNECT DB ================= */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected for MCQ Seeding");
  } catch (error) {
    console.error("❌ DB Connection Failed", error);
    process.exit(1);
  }
};

/* ================= SEED MCQs ================= */
const seedMCQs = async () => {
  try {
    // Connect to database
    await connectDB();

    // Read the JSON file
    console.log("📖 Reading MCQs from file...");
    const mcqsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "mcqs-1000.json"), "utf-8")
    );

    console.log(`📊 Found ${mcqsData.length} MCQs to seed`);

    // Clear existing MCQs (OPTIONAL - comment out if you want to keep old data)
    console.log("🧹 Clearing old MCQs...");
    await MCQ.deleteMany({});
    console.log("✅ Old MCQs cleared");

    // Insert new MCQs in batches (for better performance)
    const BATCH_SIZE = 100;
    let inserted = 0;

    for (let i = 0; i < mcqsData.length; i += BATCH_SIZE) {
      const batch = mcqsData.slice(i, i + BATCH_SIZE);
      await MCQ.insertMany(batch);
      inserted += batch.length;
      console.log(`📥 Inserted ${inserted}/${mcqsData.length} MCQs...`);
    }

    console.log("\n✅ SUCCESS! MCQs seeded successfully");
    console.log(`📊 Total MCQs in database: ${inserted}`);

    // Show statistics
    console.log("\n📈 Database Statistics:");
    
    const categoryStats = await MCQ.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    console.log("\n📚 By Category:");
    console.table(categoryStats);

    const difficultyStats = await MCQ.aggregate([
      { $group: { _id: "$difficulty", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    console.log("\n🎯 By Difficulty:");
    console.table(difficultyStats);

    const examTypeStats = await MCQ.aggregate([
      { $group: { _id: "$examType", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    console.log("\n📝 By Exam Type:");
    console.table(examTypeStats);

    // Close connection
    await mongoose.connection.close();
    console.log("\n👋 Database connection closed");
    process.exit(0);

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

// Run the seeder
seedMCQs();