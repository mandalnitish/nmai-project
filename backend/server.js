import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

// ROUTES
import authRoutes from "./routes/auth.js"; // ✅ MUST MATCH EXACT FILE NAME
import articleRoutes from "./routes/articles.js";
import mcqRoutes from "./routes/mcqRoutes.js";
import userRoutes from "./routes/users.js";
// import newsletterRoutes from "./routes/newsletter.js";
// import adminRoutes from "./routes/admin.js";

/* ================= ENV ================= */
dotenv.config();

/* ================= DB ================= */
connectDB();

/* ================= APP ================= */
const app = express();

/* ================= MIDDLEWARE ================= */
app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= RATE LIMIT ================= */
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS || 100),
  message: "Too many requests, please try again later.",
});

app.use("/api/", limiter);

/* ================= STATIC ================= */
app.use("/uploads", express.static("uploads"));

/* ================= ROUTES ================= */
app.use("/api/articles", articleRoutes);
app.use("/api/mcqs", mcqRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/newsletter", newsletterRoutes);
// app.use("/api/admin", adminRoutes);

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
  console.error("❌ ERROR:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Frontend: ${process.env.FRONTEND_URL || "http://localhost:3000"}`);
});
