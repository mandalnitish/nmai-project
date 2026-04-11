import React from "react";
import { useNavigate } from "react-router-dom";
import ArticleImage from "./ArticleImage";
import "./ArticleCard.css";

/* ── Category → color class map ── */
const CATEGORY_COLOR = {
  "National":      "teal",
  "International": "purple",
  "Economy":       "amber",
  "Polity":        "indigo",
  "Science":       "green",
  "Technology":    "cyan",
  "Environment":   "emerald",
  "Defence":       "red",
  "Sports":        "orange",
  "Government Schemes": "blue",
  "History":       "brown",
  "Health":        "pink",
  "Culture":       "violet",
};

const getCategoryColor = (cat) => CATEGORY_COLOR[cat] || "blue";

const ArticleCard = ({ article, layout = "horizontal" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${article.slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formattedDate =
    article.dateLabel ||
    (article.publishDate || article.createdAt
      ? new Date(article.publishDate || article.createdAt).toLocaleDateString(
          "en-IN",
          { day: "numeric", month: "short", year: "numeric" }
        )
      : "");

  const colorClass = getCategoryColor(article.category);

  return (
    <div
      className={`ac-card ac-${layout}`}
      onClick={handleClick}
      role="article"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      {/* ── Thumbnail ── */}
      <div className="ac-thumb">
        <ArticleImage
          imageName={article.featuredImage?.url}
          title={article.title}
          className="ac-thumb-img"
          width={220}
          height={140}
        />
      </div>

      {/* ── Body ── */}
      <div className="ac-body">
        {/* Meta row */}
        <div className="ac-meta">
          <span className={`ac-badge ac-badge-${colorClass}`}>
            {article.category}
          </span>
          <span className="ac-date">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8"  y1="2" x2="8"  y2="6"/>
              <line x1="3"  y1="10" x2="21" y2="10"/>
            </svg>
            {formattedDate}
          </span>
          {article.examRelevance?.length > 0 && (
            <span className="ac-exam-tag">{article.examRelevance[0]}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="ac-title">{article.title}</h3>

        {/* Summary */}
        <p className="ac-summary">{article.summary}</p>

        {/* Footer */}
        <div className="ac-footer">
          <span className="ac-read-more">
            Read more
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor"
                strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          {article.readingTime && (
            <span className="ac-reading-time">{article.readingTime}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;