import { Link } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import "./ArticleCard.css";

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

const ArticleCard = ({ article }) => {
  return (
    <Link
      to={`/article/${article.slug}`}
      className="article-card-horizontal"
    >
      {/* IMAGE */}
      <div className="article-card-image">
        <img
          src={
            article.featuredImage?.url ||
            `https://source.unsplash.com/400x250/?${article.category || "news"}`
          }
          alt={article.title}
          loading="lazy"
        />
      </div>

      {/* CONTENT */}
      <div className="article-card-content">
        <div className="article-card-meta">
          {article.category && (
            <span className="category">{article.category}</span>
          )}
          <span>
            <FiCalendar />{" "}
            {formatDate(article.publishDate || article.createdAt)}
          </span>
        </div>

        <h3 className="article-card-title">{article.title}</h3>

        {article.summary && (
          <p className="article-card-summary">
            {article.summary}
          </p>
        )}

        <span className="article-card-read">Read More</span>
      </div>
    </Link>
  );
};

export default ArticleCard;
