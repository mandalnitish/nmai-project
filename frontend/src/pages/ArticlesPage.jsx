import { useEffect, useState } from "react";
import { getAllArticles } from "../services/articleService";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);

        // 🔹 Explicit params (important)
        const res = await getAllArticles({
          page: 1,
          limit: 12,
        });

        // 🔥 FIX: backend returns `articles`
        const list = Array.isArray(res?.articles)
          ? res.articles
          : [];

        setArticles(list);
      } catch (err) {
        console.error("Failed to load articles:", err);
        setError("Failed to load articles");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Latest Articles</h2>

      {articles.length === 0 && <p>No articles found.</p>}

      {articles.map((article) => (
        <div key={article._id} style={{ marginBottom: "1rem" }}>
          <h3>{article.title}</h3>
          <p>{article.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default ArticlesPage;
