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
import uploadRoutes from "./routes/uploadRoutes.js";
import sitemapRoute from "./routes/sitemap.js";

/* ================= ENV ================= */
dotenv.config();

/* ================= DB ================= */
connectDB();

/* ================= APP ================= */
const app = express();

/* ================= PROXY ================= */
app.set("trust proxy", 1);

/* ================= SECURITY ================= */
app.use(helmet());

/* ================= BODY PARSER ================= */
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

/* ================= CORS ================= */
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:45678",
  "https://www.nmai.in",
  "https://nmai.in",
  "https://nmai-project.vercel.app",
  "https://nmai-project-git-main-nitish-mandal.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);

/* ================= RATE LIMIT ================= */

// Detect Googlebot
const isGooglebot = (req) => {
  const ua = req.headers["user-agent"] || "";
  return ua.toLowerCase().includes("googlebot");
};

// General limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => isGooglebot(req),
  message: "Too many requests, please try again later.",
});

// Upload limiter
const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  skip: (req) => isGooglebot(req),
});

app.use("/api/", apiLimiter);
app.use("/api/upload", uploadLimiter);

/* ================= STATIC ================= */
app.use("/uploads", express.static("uploads"));

/* ================= ROBOTS ================= */
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");

  res.send(`User-agent: *

Allow: /
Allow: /api/articles
Allow: /uploads

Disallow: /api/auth
Disallow: /api/users
Disallow: /api/upload

Sitemap: https://www.nmai.in/sitemap.xml
`);
});

/* ================= ROUTES ================= */
app.use("/api/upload", uploadRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/mcqs", mcqRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/", sitemapRoute);

/* ================= HEALTH ================= */
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "NMAI API is running",
    time: new Date().toISOString(),
  });
});

/* ================= API ROOT (FIX ADDED) ================= */
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "NMAI API Root",
    version: "1.0.0",
    endpoints: [
      "/api/articles",
      "/api/mcqs",
      "/api/auth",
      "/api/users",
      "/api/upload",
      "/api/health",
    ],
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
    path: req.originalUrl,
  });
});

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.message);

  // Handle CORS error specifically
  if (err.message === "CORS not allowed") {
    return res.status(403).json({
      success: false,
      message: "CORS blocked",
    });
  }

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