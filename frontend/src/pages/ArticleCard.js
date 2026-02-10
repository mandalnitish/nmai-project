// components/ArticleCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleImage from './ArticleImage';

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/article/${article.slug}`);
  };

  // Extract image name from URL
 const getImageName = (url) => {
    return url; // Returns full Cloudinary URL
   };

  return (
    <div className="article-card">
      {/* Article Image */}
      <div className="article-card-image">
        <ArticleImage
          imageName={getImageName(article.featuredImage?.url)}
          title={article.title}
          className="card-image"
          width={400}
          height={250}
        />
        <span className="category-badge">{article.category}</span>
      </div>

      {/* Article Content */}
      <div className="article-card-content">
        <div className="article-date">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {new Date(article.publishDate).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </div>

        <h3 className="article-title">{article.title}</h3>
        <p className="article-summary">{article.summary}</p>

        <button onClick={handleReadMore} className="read-more-button">
          Read More →
        </button>
      </div>

      <style jsx>{`
        .article-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .article-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .article-card-image {
          position: relative;
          width: 100%;
          height: 250px;
          overflow: hidden;
          background: #f0f0f0;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .category-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #3b82f6;
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .article-card-content {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .article-date {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #6c757d;
          font-size: 13px;
          margin-bottom: 12px;
        }

        .article-title {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 12px 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .article-summary {
          font-size: 14px;
          color: #6c757d;
          line-height: 1.6;
          margin: 0 0 16px 0;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .read-more-button {
          align-self: flex-start;
          background: transparent;
          border: none;
          color: #3b82f6;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }

        .read-more-button:hover {
          color: #2563eb;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default ArticleCard;