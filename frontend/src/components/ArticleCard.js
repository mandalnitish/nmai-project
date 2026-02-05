import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import "./ArticleCard.css";

const ArticleCard = ({ article }) => {
  // Safe date handling
  let formattedDate = "—";

  if (article?.createdAt) {
    const date = new Date(article.createdAt);
    if (!isNaN(date.getTime())) {
      formattedDate = format(date, "dd MMM yyyy");
    }
  }

  return (
    <article className="article-card">
      {/* Optional image */}
      {article?.image && (
        <div className="article-image">
          <img src={article.image} alt={article.title} />
        </div>
      )}

      <div className="article-content">
        <div className="article-header">
          <span className="article-category">{article.category}</span>
          <span className="article-date">{formattedDate}</span>
        </div>

        <Link to={`/article/${article.slug}`} className="article-title">
          {article.title}
        </Link>

        {article.summary && (
          <p className="article-summary">{article.summary}</p>
        )}

        <div className="article-footer">
          {article.examTags?.length > 0 && (
            <div className="article-tags">
              {article.examTags.slice(0, 3).map((exam, index) => (
                <span key={index} className="tag">
                  {exam}
                </span>
              ))}
            </div>
          )}

          <Link to={`/article/${article.slug}`} className="read-more">
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
