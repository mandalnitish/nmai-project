import express from "express";
import Article from "../models/Article.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

/* =====================================================
   GET ALL ARTICLES (MAIN LIST)
   GET /api/articles
   ===================================================== */
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      examRelevance,
      search,
      sort = "-publishDate",
    } = req.query;

    // ✅ Base filter (published only)
    const filter = {
      $or: [{ status: "published" }, { published: true }],
    };

    if (category) filter.category = category;
    if (examRelevance) filter.examRelevance = examRelevance;

    if (search) {
      filter.$and = [
        {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { summary: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } },
          ],
        },
      ];
    }

    const articles = await Article.find(filter)
      .sort(sort)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .populate("author", "name")
      .select("-content")
      .lean();

    const total = await Article.countDocuments(filter);

    res.json({
      success: true,
      data: articles,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Articles fetch error:", err);
    res.status(500).json({
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
    const limit = Number(req.query.limit) || 10;

    const articles = await Article.find({
      $or: [{ status: "published" }, { published: true }],
    })
      .sort({ publishDate: -1, createdAt: -1 })
      .limit(limit)
      .select(
        "title slug summary category publishDate featuredImage examRelevance viewCount"
      )
      .populate("author", "name")
      .lean();

    res.json({ success: true, data: articles });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch latest articles",
    });
  }
});

/* =====================================================
   GET TRENDING ARTICLES
   GET /api/articles/trending
   ===================================================== */
router.get("/trending", async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 5;

    const articles = await Article.find({
      $or: [{ status: "published" }, { published: true }],
    })
      .sort({ viewCount: -1, likes: -1 })
      .limit(limit)
      .select("title slug summary category viewCount featuredImage")
      .populate("author", "name")
      .lean();

    res.json({ success: true, data: articles });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch trending articles",
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
      $or: [{ status: "published" }, { published: true }],
    })
      .populate("author", "name")
      .populate("relatedArticles", "title slug summary category featuredImage");

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    article.viewCount = (article.viewCount || 0) + 1;
    await article.save();

    res.json({ success: true, data: article });
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
  try {
    const article = await Article.create({
      ...req.body,
      author: req.user._id,
      status: "published",
      published: true,
    });

    res.status(201).json({ success: true, data: article });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

/* =====================================================
   UPDATE ARTICLE (ADMIN)
   ===================================================== */
router.put("/:id", protect, authorize("admin"), async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!article) {
    return res
      .status(404)
      .json({ success: false, message: "Article not found" });
  }

  res.json({ success: true, data: article });
});

/* =====================================================
   DELETE ARTICLE (ADMIN)
   ===================================================== */
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    return res
      .status(404)
      .json({ success: false, message: "Article not found" });
  }

  await article.deleteOne();
  res.json({ success: true, message: "Article deleted" });
});

export default router;
