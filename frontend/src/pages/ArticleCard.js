import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiTag } from "react-icons/fi";
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
      <div className="article-card-image-horizontal">
        <img
          src={
            article.featuredImage?.url ||
            `https://source.unsplash.com/400x300/?${article.category || "news"}`
          }
          alt={article.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://source.unsplash.com/400x300/?current-affairs";
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="article-card-content-horizontal">
        {/* Meta */}
        <div className="article-card-meta-horizontal">
          {article.category && (
            <span className="article-category-badge-horizontal">
              <FiTag /> {article.category}
            </span>
          )}
          {dateText && (
            <span className="article-date-horizontal">
              <FiCalendar /> {dateText}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="article-title-horizontal">{article.title}</h3>

        {/* Summary */}
        {article.summary && (
          <p className="article-summary-horizontal">{article.summary}</p>
        )}

        {/* Read more */}
        <span className="article-read-more-horizontal">Read Full Article →</span>
      </div>
    </Link>
  );
};

export default ArticleCard;