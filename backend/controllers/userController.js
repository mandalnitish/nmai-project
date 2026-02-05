import User from "../models/User.js";

/* ================= SAVE ================= */
export const saveArticle = async (req, res) => {
  const { articleId } = req.params;

  const user = await User.findById(req.user.id);

  if (!user.savedArticles.includes(articleId)) {
    user.savedArticles.push(articleId);
    await user.save();
  }

  res.json({
    success: true,
    message: "Article saved",
  });
};

/* ================= UNSAVE ================= */
export const unsaveArticle = async (req, res) => {
  const { articleId } = req.params;

  const user = await User.findById(req.user.id);

  user.savedArticles = user.savedArticles.filter(
    (id) => id.toString() !== articleId
  );

  await user.save();

  res.json({
    success: true,
    message: "Article removed",
  });
};

/* ================= GET SAVED ================= */
export const getSavedArticles = async (req, res) => {
  const user = await User.findById(req.user.id).populate("savedArticles");

  res.json({
    success: true,
    data: user.savedArticles,
  });
};
