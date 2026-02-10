import React, { useState } from "react";
import { FiImage } from "react-icons/fi";
import "./ArticleImage.css";

/**
 * ArticleImage Component - Works with Cloudinary URLs
 * Handles full Cloudinary URLs from database
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
   * Get the proper image URL
   * imageName is the FULL URL from database like:
   * https://res.cloudinary.com/dyftyrehc/image/upload/v1770720657/nmai-articles/wtsc...
   */
  const getImageUrl = () => {
    if (!imageName) {
      console.log('❌ No image name provided');
      return null;
    }

    // Already a full URL - use it directly
    if (imageName.startsWith('https://') || imageName.startsWith('http://')) {
      console.log('✅ Using full URL:', imageName.substring(0, 80));
      return imageName;
    }

    // Fallback: shouldn't reach here, but just in case
    console.warn('⚠️  Unexpected image format:', imageName);
    return null;
  };

  const imageUrl = getImageUrl();

  const handleImageLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleImageError = (e) => {
    console.error('❌ Image failed to load:', imageUrl);
    console.error('   Error:', e.type);
    setLoading(false);
    setError(true);
  };

  // Show placeholder if no image or error
  if (!imageName || !imageUrl || error) {
    return (
      <div className={`article-image-placeholder ${className}`}>
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