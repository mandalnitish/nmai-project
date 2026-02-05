import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import "./ArticleCard.css";

/* ================= DATE FORMATTER ================= */

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const ArticleCard = ({ article }) => {
  const dateText =
    article.dateLabel ||
    formatDate(article.publishDate || article.createdAt);

  return (
    <Link to={`/article/${article.slug}`} className="article-card-horizontal">
      {/* IMAGE */}
      {article.featuredImage?.url && (
        <div className="article-image">
          <img
            src={article.featuredImage.url}
            alt={article.title}
            loading="lazy"
          />
        </div>
      )}

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
