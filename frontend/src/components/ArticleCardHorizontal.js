import React from "react";
import { useNavigate } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import ArticleImage from "./ArticleImage";
import "./ArticleCardHorizontal.css";

const ArticleCardHorizontal = ({ article }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${article.slug}`);
  };

  const getImageName = (url) => {
    if (!url) return null;
    return url.split("/").pop();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div 
      className="article-card-horizontal" 
      onClick={handleClick}
      role="article"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      {/* IMAGE */}
      <div className="article-card-image-horizontal">
        <ArticleImage
          imageName={getImageName(article.featuredImage?.url)}
          title={article.title}
          className="article-image"
        />
      </div>

      {/* CONTENT */}
      <div className="article-card-content-horizontal">
        {/* META */}
        <div className="article-card-meta-horizontal">
          {article.category && (
            <span className="article-category-badge-horizontal">
              {article.category}
            </span>
          )}
          <span className="article-date-horizontal">
            <FiCalendar />
            {formatDate(article.publishDate || article.createdAt)}
          </span>
        </div>

        {/* TITLE */}
        <h3 className="article-title-horizontal">{article.title}</h3>

        {/* SUMMARY */}
        {article.summary && (
          <p className="article-summary-horizontal">{article.summary}</p>
        )}

        {/* READ MORE */}
        <span className="article-read-more-horizontal">Read More</span>
      </div>
    </div>
  );
};

export default ArticleCardHorizontal;