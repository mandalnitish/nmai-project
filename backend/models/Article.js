import mongoose from "mongoose";
import slugify from "slugify";

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    slug: { type: String, unique: true, index: true },

    summary: { type: String, required: true },
    content: { type: String, required: true },

    category: {
      type: String,
      required: true,
      index: true,
    },

    examRelevance: [{ type: String, index: true }],

    featuredImage: {
      url: String,
      alt: String,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    publishDate: { type: Date, default: Date.now, index: true },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
      index: true,
    },

    isActive: { type: Boolean, default: true, index: true },

    viewCount: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* ===== INDEXES (CRITICAL) ===== */
ArticleSchema.index({ status: 1, isActive: 1, publishDate: -1 });
ArticleSchema.index({ title: "text", summary: "text" });

/* ===== SLUG ===== */
ArticleSchema.pre("validate", async function (next) {
  if (!this.slug && this.title) {
    let slug = slugify(this.title, { lower: true, strict: true });
    let i = 1;

    while (await mongoose.models.Article.exists({ slug })) {
      slug = `${slug}-${i++}`;
    }

    this.slug = slug;
  }
  next();
});

export default mongoose.model("Article", ArticleSchema);
