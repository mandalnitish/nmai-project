import React, { useState } from "react";
import "./ArticleImage.css";

const ArticleImage = ({ imageName, title, className = "", width, height }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Construct image path
  const imagePath = imageName
    ? `/images/articles/${imageName.replace(/\.(jpg|jpeg|png|webp)$/i, "")}.png`
    : null;

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  // Show placeholder if no image or error
  if (!imagePath || error) {
    return (
      <div className={`article-image-placeholder ${className}`}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <p>Image unavailable</p>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div className={`article-image-placeholder ${className}`}>
          <div className="image-loader"></div>
        </div>
      )}
      <img
        src={imagePath}
        alt={title || "Article image"}
        className={`article-image ${className} ${loading ? 'loading' : ''}`}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        style={{ display: loading ? 'none' : 'block' }}
      />
    </>
  );
};

export default ArticleImage;