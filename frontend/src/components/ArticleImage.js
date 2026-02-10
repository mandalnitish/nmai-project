import React, { useState, useEffect } from "react";
import { FiImage } from "react-icons/fi";
import "./ArticleImage.css";

const ArticleImage = ({ 
  imageName, 
  title = "Article Image", 
  className = "",
  width,
  height,
  lazy = true 
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!imageName) {
      setLoading(false);
      setError(true);
      return;
    }

    // Construct image URL - adjust based on your backend
    const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const url = `${baseUrl}/api/uploads/${imageName}`;
    
    setImageUrl(url);
  }, [imageName]);

  const handleImageLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  // Show placeholder if no image or error
  if (!imageName || error) {
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