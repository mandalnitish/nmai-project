import express from "express";
import Article from "../models/Article.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

/* =====================================================
   GET ALL ARTICLES
   GET /api/articles
   ===================================================== */
router.get("/", async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 12, 50);
    const skip = (page - 1) * limit;

    const { category, examRelevance, search } = req.query;

    /* ===== BASE FILTER (MATCHES DB DATA) ===== */
    const filter = {
      status: "published",
      isActive: true,
    };

    if (category) filter.category = category;

    // 🔧 FIX 1: examRelevance is an ARRAY in DB
    if (examRelevance) {
      filter.examRelevance = { $in: [examRelevance] };
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { summary: { $regex: search, $options: "i" } },
      ];
    }

    const [articles, total] = await Promise.all([
      Article.find(filter)
        .sort({ publishDate: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-content")
        .populate("author", "name")
        .lean(),

      Article.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      articles,
      pagination: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("❌ Articles fetch error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch articles",
    });
  }
});

/* =====================================================
   GET LATEST ARTICLES
   GET /api/articles/latest
   ===================================================== */
router.get("/latest", async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 10, 20);

    const articles = await Article.find({
      status: "published",
      isActive: true,
    })
      .sort({ publishDate: -1, createdAt: -1 })
      .limit(limit)
      .select("title slug summary category publishDate featuredImage")
      .populate("author", "name")
      .lean();

    res.json({ success: true, articles });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch latest articles",
    });
  }
});

/* =====================================================
   GET ARTICLE BY SLUG
   GET /api/articles/:slug
   ===================================================== */
router.get("/:slug", async (req, res) => {
  try {
    const article = await Article.findOne({
      slug: req.params.slug,
      status: "published",
      isActive: true,
    })
      .populate("author", "name")
      .populate("relatedArticles", "title slug")
      .lean();

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    // 🔧 FIX 2: non-blocking view count update
    Article.updateOne(
      { _id: article._id },
      { $inc: { viewCount: 1 } }
    ).exec();

    res.json({ success: true, article });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch article",
    });
  }
});

/* =====================================================
   CREATE ARTICLE (ADMIN)
   ===================================================== */
router.post("/", protect, authorize("admin", "author"), async (req, res) => {
  const article = await Article.create({
    ...req.body,
    author: req.user._id,
    status: "published",
    isActive: true,
  });

  res.status(201).json({ success: true, article });
});

export default router;
