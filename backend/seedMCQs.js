import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import MCQ from "./models/MCQ.js";

/* ================== CONFIG ================== */
dotenv.config();

// ES Module __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Safety flag (set to true ONLY when you want to wipe data)
const CLEAR_OLD_DATA = true;

// Batch size
const BATCH_SIZE = 100;

/* ================= CONNECT DB ================= */
const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI not found in .env file");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected for MCQ Seeding");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

/* ================= SEED MCQs ================= */
const seedMCQs = async () => {
  try {
    await connectDB();

    /* ---------- Read JSON ---------- */
    const filePath = path.join(__dirname, "mcqs-1000.json");

    if (!fs.existsSync(filePath)) {
      console.error("❌ mcqs-1000.json file not found");
      process.exit(1);
    }

    console.log("📖 Reading MCQs from JSON file...");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const mcqsData = JSON.parse(rawData);

    if (!Array.isArray(mcqsData) || mcqsData.length === 0) {
      console.error("❌ MCQ JSON is empty or invalid");
      process.exit(1);
    }

    console.log(`📊 Found ${mcqsData.length} MCQs to seed`);

    /* ---------- Clear Old Data ---------- */
    if (CLEAR_OLD_DATA) {
      console.log("🧹 Clearing old MCQs...");
      const result = await MCQ.deleteMany({});
      console.log(`✅ Deleted ${result.deletedCount} old MCQs`);
    } else {
      console.log("⚠️ Old MCQs NOT cleared (safe mode)");
    }

    /* ---------- Insert in Batches ---------- */
    let inserted = 0;

    for (let i = 0; i < mcqsData.length; i += BATCH_SIZE) {
      const batch = mcqsData.slice(i, i + BATCH_SIZE);

      await MCQ.insertMany(batch, {
        ordered: false, // continues even if one doc fails
      });

      inserted += batch.length;
      console.log(`📥 Inserted ${inserted}/${mcqsData.length} MCQs`);
    }

    /* ---------- Summary ---------- */
    console.log("\n✅ MCQ Seeding Completed Successfully");
    console.log(`📊 Total Inserted: ${inserted}`);

    /* ---------- Statistics ---------- */
    console.log("\n📈 Database Statistics");

    const categoryStats = await MCQ.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    console.log("\n📚 By Category");
    console.table(categoryStats);

    const difficultyStats = await MCQ.aggregate([
      { $group: { _id: "$difficulty", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    console.log("\n🎯 By Difficulty");
    console.table(difficultyStats);

    const examTypeStats = await MCQ.aggregate([
      { $group: { _id: "$examType", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    console.log("\n📝 By Exam Type");
    console.table(examTypeStats);

    /* ---------- Close DB ---------- */
    await mongoose.connection.close();
    console.log("\n👋 Database connection closed");
    process.exit(0);

  } catch (error) {
    console.error("❌ MCQ Seeding Failed:", error);
    process.exit(1);
  }
};

/* ================= RUN ================= */
seedMCQs();
