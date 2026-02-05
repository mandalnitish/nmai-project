// controllers/articleController.js
export const getArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;

    const query = category && category !== "All"
      ? { category }
      : {};

    const total = await Article.countDocuments(query);

    const articles = await Article.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      articles,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalArticles: total
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
