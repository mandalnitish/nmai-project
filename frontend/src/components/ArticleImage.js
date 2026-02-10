import React, { useState } from "react";
import { FiImage } from "react-icons/fi";
import "./ArticleImage.css";

/**
 * ArticleImage Component - Optimized for Cloudinary URLs
 * 
 * Handles three types of image URLs:
 * 1. Full Cloudinary URL (https://res.cloudinary.com/...)
 * 2. Image filename only (will construct Cloudinary URL)
 * 3. Legacy local URLs (/uploads/...)
 */
const ArticleImage = ({ 
  imageName, 
  title = "Article Image", 
  className = "",
  width,
  height,
  lazy = true 
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /**
   * Construct the proper image URL
   */
  const getImageUrl = () => {
    if (!imageName) return null;

    // If it's already a full Cloudinary URL, use it directly
    if (imageName.startsWith('http://') || imageName.startsWith('https://')) {
      return imageName;
    }

    // If it's a Cloudinary public ID (e.g., "nmai-articles/image.jpg")
    // Construct the full URL
    if (imageName.includes('nmai-articles/')) {
      const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'your-cloud-name';
      return `https://res.cloudinary.com/${cloudName}/image/upload/${imageName}`;
    }

    // Legacy: Try local backend (fallback)
    const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
    return `${baseUrl}/uploads/${imageName}`;
  };

  const imageUrl = getImageUrl();

  const handleImageLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  // Show placeholder if no image or error
  if (!imageName || !imageUrl || error) {
    return (
      <div className="article-image-placeholder">
        <FiImage size={48} />
        <p>No image available</p>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div className="article-image-placeholder">
          <div className="image-loader"></div>
        </div>
      )}
      
      <img
        src={imageUrl}
        alt={title}
        className={`article-image ${className} ${loading ? 'loading' : ''}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading={lazy ? "lazy" : "eager"}
        width={width}
        height={height}
        style={{ display: loading ? 'none' : 'block' }}
      />
    </>
  );
};

export default ArticleImage;