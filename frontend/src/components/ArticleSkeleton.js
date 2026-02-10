import React from 'react';
import './ArticleSkeleton.css';

const ArticleSkeleton = () => {
  return (
    <div className="article-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-meta">
          <div className="skeleton-badge"></div>
          <div className="skeleton-date"></div>
        </div>
        <div className="skeleton-title"></div>
        <div className="skeleton-title short"></div>
        <div className="skeleton-summary"></div>
        <div className="skeleton-summary"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;