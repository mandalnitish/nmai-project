// components/ArticleCard.js - UNIFIED VERSION
import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar } from 'react-icons/fi';
import ArticleImage from './ArticleImage';
import './ArticleCard.css';

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

/**
 * ArticleCard Component
 * Supports both vertical and horizontal layouts
 */
const ArticleCard = ({ article, layout = 'vertical' }) => {
  const isHorizontal = layout === 'horizontal';
  
  return (
    <Link
      to={`/article/${article.slug}`}
      className={`article-card ${isHorizontal ? 'article-card--horizontal' : 'article-card--vertical'}`}
      aria-label={`Read article: ${article.title}`}
    >
      {/* ================= IMAGE ================= */}
      <div className="article-card__image">
        <ArticleImage
          imageName={article.featuredImage?.url}
          title={article.title}
          cardSize={true} // Use optimized card size
          lazy={true}
        />
        
        {/* Category Badge - only for vertical layout */}
        {!isHorizontal && article.category && (
          <span className="article-card__category-badge">
            {article.category}
          </span>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="article-card__content">
        {/* Meta */}
        <div className="article-card__meta">
          {isHorizontal && article.category && (
            <span className="article-card__category">
              {article.category}
            </span>
          )}
          <span className="article-card__date">
            <FiCalendar />
            {formatDate(article.publishDate || article.createdAt)}
          </span>
        </div>

        {/* Title */}
        <h3 className="article-card__title">{article.title}</h3>

        {/* Summary */}
        {article.summary && (
          <p className="article-card__summary">{article.summary}</p>
        )}

        {/* Read More */}
        <span className="article-card__read-more">
          Read {isHorizontal ? 'More' : 'full article'}
        </span>
      </div>
    </Link>
  );
};

export default ArticleCard;