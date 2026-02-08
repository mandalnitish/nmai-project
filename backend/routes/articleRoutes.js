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

    const filter = {
      status: "published",
      isActive: true,
    };

    if (category) filter.category = category;
    if (examRelevance) filter.examRelevance = { $in: [examRelevance] };

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

    res.json({
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
    res.json({
      success: false,
      message: "Failed to fetch articles",
    });
  }
});

/* =====================================================
   ✅ GET ARTICLE BY SLUG (FIXED)
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
      .lean();

    if (!article) {
      return res.json({
        success: false,
        message: "Article not found",
      });
    }

    // non-blocking view count increment
    Article.updateOne(
      { _id: article._id },
      { $inc: { viewCount: 1 } }
    ).exec();

    res.json({
      success: true,
      article,
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Failed to fetch article",
    });
  }
});

/* =====================================================
   CREATE ARTICLE (ADMIN)
   POST /api/articles
   ===================================================== */
router.post("/", protect, authorize("admin", "author"), async (req, res) => {
  const article = await Article.create({
    ...req.body,
    author: req.user._id,
    status: "published",
    isActive: true,
  });

  res.json({ success: true, article });
});

export default router;
