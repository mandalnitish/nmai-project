import mongoose from "mongoose";

/* ==========================================================================
   Article Schema (Seeder-safe, Production-ready)
   ========================================================================== */

const ArticleSchema = new mongoose.Schema(
  {
    /* ================= CORE ================= */
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    slug: {
      type: String,
      required: true, // ✅ slug MUST be provided by seeder / admin
      unique: true,
      index: true,
    },

    summary: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    /* ================= CLASSIFICATION ================= */
    category: {
      type: String,
      required: true,
      index: true,
    },

    tags: {
      type: [String],
      default: [],
      index: true,
    },

    examRelevance: {
      type: [String],
      default: ["UPSC", "SSC"],
      index: true,
    },

    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
      index: true,
    },

    /* ================= META ================= */
    readingTime: {
      type: String,
      default: "6 min",
    },

    sources: {
      type: [String],
      default: [],
    },

    featuredImage: {
      url: String,
      alt: String,
    },

    /* ================= AUTHOR ================= */
    author: {
      type: String, // compatible with seed + admin
      default: "Current Affairs Desk",
      index: true,
    },

    /* ================= STATUS ================= */
    publishDate: {
      type: Date,
      default: Date.now,
      index: true,
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    /* ================= STATS ================= */
    viewCount: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

/* ================= INDEXES (PERFORMANCE) ================= */
ArticleSchema.index({ status: 1, isActive: 1, publishDate: -1 });
ArticleSchema.index({ title: "text", summary: "text", content: "text" });

/* ================= QUERY HELPERS ================= */
// Auto-hide inactive articles in all find queries
ArticleSchema.pre(/^find/, function (next) {
  this.where({ isActive: true });
  next();
});

export default mongoose.model("Article", ArticleSchema);
