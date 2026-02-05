import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/* ================================
   GET SAVED ARTICLES
   GET /api/users/saved-articles
================================ */
router.get("/saved-articles", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("savedArticles", "title slug category publishDate featuredImage")
      .select("-password");

    res.json({
      success: true,
      data: user.savedArticles || [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch saved articles",
    });
  }
});

/* ================================
   SAVE ARTICLE
   POST /api/users/save-article/:articleId
================================ */
router.post("/save-article/:articleId", protect, async (req, res) => {
  try {
    const { articleId } = req.params;

    const user = await User.findById(req.user.id);

    if (!user.savedArticles.includes(articleId)) {
      user.savedArticles.push(articleId);
      await user.save();
    }

    res.json({
      success: true,
      message: "Article saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save article",
    });
  }
});

/* ================================
   UNSAVE ARTICLE
   DELETE /api/users/save-article/:articleId
================================ */
router.delete("/save-article/:articleId", protect, async (req, res) => {
  try {
    const { articleId } = req.params;

    const user = await User.findById(req.user.id);

    user.savedArticles = user.savedArticles.filter(
      (id) => id.toString() !== articleId
    );

    await user.save();

    res.json({
      success: true,
      message: "Article removed from saved",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove article",
    });
  }
});

/* ================================
   GET QUIZ HISTORY
   GET /api/users/quiz-history
================================ */
router.get("/quiz-history", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("quizHistory.mcq");

    res.json({
      success: true,
      data: user.quizHistory || [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch quiz history",
    });
  }
});

export default router;
