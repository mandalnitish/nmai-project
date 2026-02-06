import { Link } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import "./ArticleCard.css";

/* ================= DATE FORMATTER ================= */
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/* ================= COMPONENT ================= */
const ArticleCard = ({ article }) => {
  const dateText =
    article.dateLabel ||
    formatDate(article.publishDate || article.createdAt);

  return (
    <Link to={`/article/${article.slug}`} className="article-card-horizontal">
      {/* IMAGE */}
      <div className="article-image">
        <img
          src={
            article.featuredImage?.url ||
            `https://source.unsplash.com/400x250/?${article.category || "news"}`
          }
          alt={article.title}
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://source.unsplash.com/400x250/?current-affairs";
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="article-card-content">
        <div className="article-meta">
          {article.category && (
            <span className="category">{article.category}</span>
          )}

          {dateText && (
            <span className="date">
              <FiCalendar /> {dateText}
            </span>
          )}
        </div>

        <h3 className="title">{article.title}</h3>

        {article.summary && (
          <p className="summary">{article.summary}</p>
        )}

        <span className="read-more">Read More →</span>
      </div>
    </Link>
  );
};

export default ArticleCard;
