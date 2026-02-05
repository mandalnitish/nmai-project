// models/Article.js
import mongoose from "mongoose";
import slugify from "slugify";

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },

    summary: {
      type: String,
      required: true,
      maxlength: 500,
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Economy",
        "Polity",
        "Science",
        "Technology",
        "Environment",
        "International",
        "Social",
        "Defence",
        "History",
        "Geography",
        "National",
      ],
      index: true,
    },

    examRelevance: [
      {
        type: String,
        enum: [
          "UPSC",
          "SSC",
          "Banking",
          "Railways",
          "State PSC",
          "Defence",
          "Judiciary",
          "Engineering",
        ],
        index: true,
      },
    ],

    tags: [{ type: String, trim: true, maxlength: 50 }],

    featuredImage: {
      url: {
        type: String,
        default:
          "https://source.unsplash.com/random/800x400?currentaffairs",
      },
      alt: {
        type: String,
        default: "Article featured image",
      },
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

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

    isPremium: { type: Boolean, default: false },

    viewCount: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },

    readingTime: { type: String, default: "5 min" },

    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Intermediate",
    },

    sources: [String],

    relatedArticles: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
    ],

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true, // ✅ createdAt & updatedAt (used for cursor)
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/* ================= INDEXES (CRITICAL) ================= */
ArticleSchema.index({ createdAt: -1 }); // Cursor pagination
ArticleSchema.index({ category: 1, createdAt: -1 });
ArticleSchema.index({ status: 1, isActive: 1, createdAt: -1 });
ArticleSchema.index({ title: "text", summary: "text" });

/* ================= SLUG AUTO-GENERATION ================= */
ArticleSchema.pre("validate", async function (next) {
  if (!this.slug && this.title) {
    let baseSlug = slugify(this.title, {
      lower: true,
      strict: true,
    });

    let slug = baseSlug;
    let count = 1;

    while (
      await mongoose.models.Article.exists({ slug })
    ) {
      slug = `${baseSlug}-${count++}`;
    }

    this.slug = slug;
  }
  next();
});

export default mongoose.model("Article", ArticleSchema);
