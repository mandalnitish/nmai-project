import React from "react";
import { useNavigate } from "react-router-dom";
import ArticleImage from "./ArticleImage";
import "./ArticleCard.css";

const ArticleCardHorizontal = ({ article }) => {
  const navigate = useNavigate();

  return (
    <div
      className="article-card-horizontal"
      onClick={() => navigate(`/article/${article.slug}`)}
    >
      {/* IMAGE */}
      <div className="article-card-image-horizontal">
        <ArticleImage
          imageName={article.featuredImage?.url?.split("/").pop()}
          title={article.title}
        />
      </div>

      {/* CONTENT */}
      <div className="article-card-content-horizontal">
        <div className="article-card-meta-horizontal">
          <span className="article-category-badge-horizontal">
            {article.category}
          </span>
          <span>
            {new Date(article.publishDate).toDateString()}
          </span>
        </div>

        <h3 className="article-title-horizontal">{article.title}</h3>
        <p className="article-summary-horizontal">{article.summary}</p>

        <span className="article-read-more-horizontal">
          Read More →
        </span>
      </div>
    </div>
  );
};

export default ArticleCardHorizontal;
