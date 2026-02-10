import { Link } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import ArticleImage from "./ArticleImage";
import "./ArticleCard.css";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

const ArticleCard = ({ article }) => {
  const getImageName = (url) => {
  return url; // Returns full Cloudinary URL
  };

  return (
    <Link
      to={`/article/${article.slug}`}
      className="article-card-horizontal"
      aria-label={`Read article: ${article.title}`}
    >
      {/* ================= IMAGE ================= */}
      <div className="article-card-image">
        <ArticleImage
          imageName={getImageName(article.featuredImage?.url)}
          title={article.title}
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="article-card-content">
        {/* META */}
        <div className="article-card-meta">
          {article.category && (
            <span className="article-category-badge">
              {article.category}
            </span>
          )}
          <span className="article-date">
            <FiCalendar />
            {formatDate(article.publishDate || article.createdAt)}
          </span>
        </div>

        {/* TITLE */}
        <h3 className="article-card-title">{article.title}</h3>

        {/* SUMMARY */}
        {article.summary && (
          <p className="article-card-summary">{article.summary}</p>
        )}

        {/* READ MORE */}
        <span className="article-card-read">Read full article</span>
      </div>
    </Link>
  );
};

export default ArticleCard;
