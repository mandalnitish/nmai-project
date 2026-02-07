import { useEffect, useState } from "react";
import { getAllArticles } from "../services/articleService";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllArticles()
      .then((data) => {
        setArticles(data.articles || data || []);
      })
      .catch((err) => {
        console.error("Failed to load articles:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading articles...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Latest Articles</h2>

      {articles.length === 0 && <p>No articles found.</p>}

      {articles.map((article) => (
        <div key={article._id} style={{ marginBottom: "1rem" }}>
          <h3>{article.title}</h3>
          <p>{article.summary || article.content?.slice(0, 150)}...</p>
        </div>
      ))}
    </div>
  );
};

export default ArticlesPage;
