import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

// ROUTES
import authRoutes from "./routes/auth.js";
import articleRoutes from "./routes/articleRoutes.js";
import mcqRoutes from "./routes/mcqRoutes.js";
import userRoutes from "./routes/users.js";

/* ================= ENV ================= */
dotenv.config();

/* ================= DB ================= */
connectDB();

/* ================= APP ================= */
const app = express();

/* ================= MIDDLEWARE ================= */
app.use(helmet());

/* ================= CORS ================= */
const allowedOrigins = [
  "http://localhost:3000",
  "https://www.nmai.in",
  "https://nmai.in",
  "https://nmai-project.vercel.app",
  "https://nmai-project-git-main-nitish-mandal.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= RATE LIMIT ================= */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});

app.use("/api/", limiter);

/* ================= STATIC ================= */
app.use("/uploads", express.static("uploads"));

/* =====================================================
   ROBOTS.TXT – BLOCK ALL CRAWLERS (API)
===================================================== */
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send("User-agent: *\nDisallow: /");
});

/* ================= ROUTES ================= */
app.use("/api/articles", articleRoutes);
app.use("/api/mcqs", mcqRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

/* ================= HEALTH ================= */
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "NMAI API is running",
    time: new Date().toISOString(),
  });
});

/* ================= ROOT ================= */
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to NMAI Current Affairs API",
    version: "1.0.0",
  });
});

/* ================= 404 ================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
