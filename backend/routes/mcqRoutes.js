import express from "express";
import MCQ from "../models/MCQ.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

/* =====================================================
   PRACTICE MODE
   GET /api/mcqs
   ✔ Sends correctAnswer (for practice + learning)
   ===================================================== */
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      examType,
      difficulty,
      random,
    } = req.query;

    const filter = { isActive: true };

    if (category) filter.category = category;
    if (examType) filter.examType = examType;
    if (difficulty) filter.difficulty = difficulty;

    let query = MCQ.find(filter); // 🔥 DO NOT hide correctAnswer in practice mode

    if (random === "true") {
      const count = await MCQ.countDocuments(filter);
      if (count === 0) {
        return res.json({ success: true, data: [] });
      }

      const safeLimit = Math.min(Number(limit), count);
      const skip = Math.max(0, Math.floor(Math.random() * count) - safeLimit);

      query = query.skip(skip).limit(safeLimit);
    } else {
      query = query
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));
    }

    const mcqs = await query;
    const total = await MCQ.countDocuments(filter);

    res.json({
      success: true,
      data: mcqs,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("❌ MCQ fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching MCQs",
    });
  }
});

/* =====================================================
   DAILY QUIZ (PRACTICE)
   GET /api/mcqs/daily-quiz
   ===================================================== */
router.get("/daily-quiz", async (req, res) => {
  try {
    const filter = { isActive: true };

    const count = await MCQ.countDocuments(filter);
    if (count === 0) {
      return res.json({
        success: true,
        data: [],
        message: "No quiz available today",
      });
    }

    const QUIZ_SIZE = Math.min(10, count);
    const skip = Math.max(0, Math.floor(Math.random() * count) - QUIZ_SIZE);

    const mcqs = await MCQ.find(filter)
      .skip(skip)
      .limit(QUIZ_SIZE);

    res.json({
      success: true,
      data: mcqs,
      quizId: Date.now(),
    });
  } catch (error) {
    console.error("❌ Daily quiz error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch daily quiz",
    });
  }
});

/* =====================================================
   EXAM MODE (SECURE)
   POST /api/mcqs/submit
   ✔ Frontend never checks correctness
   ✔ Backend decides result
   ===================================================== */
router.post("/submit", async (req, res) => {
  try {
    const { answers } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid answers payload",
      });
    }

    const mcqIds = answers.map((a) => a.mcqId);
    const mcqs = await MCQ.find({ _id: { $in: mcqIds } });

    let correct = 0;
    const results = [];

    answers.forEach((ans) => {
      const mcq = mcqs.find(
        (q) => q._id.toString() === ans.mcqId
      );
      if (!mcq) return;

      const isCorrect = mcq.correctAnswer === Number(ans.selectedAnswer);
      if (isCorrect) correct++;

      mcq.attemptCount += 1;
      if (isCorrect) mcq.correctAttemptCount += 1;

      results.push({
        mcqId: mcq._id,
        question: mcq.question,
        selectedAnswer: ans.selectedAnswer,
        correctAnswer: mcq.correctAnswer,
        isCorrect,
        explanation: mcq.explanation,
      });
    });

    await Promise.all(mcqs.map((m) => m.save()));

    const score = Math.round((correct / mcqs.length) * 100);

    res.json({
      success: true,
      data: {
        results,
        score,
        totalQuestions: mcqs.length,
        correctAnswers: correct,
        incorrectAnswers: mcqs.length - correct,
      },
    });
  } catch (error) {
    console.error("❌ Quiz submit error:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting quiz",
    });
  }
});

/* =====================================================
   ADMIN CRUD
   ===================================================== */
router.post("/", protect, authorize("admin", "author"), async (req, res) => {
  try {
    const mcq = await MCQ.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json({ success: true, data: mcq });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/:id", protect, authorize("admin"), async (req, res) => {
  const mcq = await MCQ.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!mcq) {
    return res
      .status(404)
      .json({ success: false, message: "MCQ not found" });
  }

  res.json({ success: true, data: mcq });
});

router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  const mcq = await MCQ.findById(req.params.id);

  if (!mcq) {
    return res
      .status(404)
      .json({ success: false, message: "MCQ not found" });
  }

  await mcq.deleteOne();
  res.json({ success: true, message: "MCQ deleted" });
});

export default router;
