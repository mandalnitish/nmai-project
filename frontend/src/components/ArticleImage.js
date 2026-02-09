import React, { useState } from "react";

const ArticleImage = ({ imageName, title, className = "" }) => {
  const [error, setError] = useState(false);

  const imagePath = imageName
    ? `/images/articles/${imageName.replace(/\.(jpg|jpeg|png|webp)$/i, "")}.png`
    : null;

  return !error && imagePath ? (
    <img
      src={imagePath}
      alt={title}
      className={`article-image ${className}`}
      onError={() => setError(true)}
    />
  ) : (
    <div className="article-image-placeholder">
      <svg
        width="42"
        height="42"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <p>Image not available</p>
    </div>
  );
};

export default ArticleImage;
