import React, { useState, useEffect } from "react";
import { FiImage } from "react-icons/fi";
import "./ArticleImage.css";

/**
 * Optimized ArticleImage Component
 * - Aggressive caching
 * - Cloudinary transformations for faster load
 * - Progressive image loading
 */
const ArticleImage = ({ 
  imageName, 
  title = "Article Image", 
  className = "",
  width,
  height,
  lazy = true,
  quality = "auto:good",
  cardSize = false // Use card-optimized size
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);

  /**
   * Get optimized Cloudinary URL with transformations
   */
  const getOptimizedImageUrl = (url) => {
    if (!url) return null;

    // Already a Cloudinary URL - optimize it
    if (url.includes('res.cloudinary.com')) {
      // Extract parts: https://res.cloudinary.com/CLOUD/image/upload/VERSION/FOLDER/FILE
      const parts = url.split('/upload/');
      
      if (parts.length === 2) {
        const [baseUrl, pathAfterUpload] = parts;
        
        // Build transformation string
        const transformations = [];
        
        // Size optimization based on usage
        if (cardSize) {
          transformations.push('w_400,h_250,c_fill,g_auto');
        } else if (width && height) {
          transformations.push(`w_${width},h_${height},c_limit`);
        } else {
          transformations.push('w_1200,c_limit'); // Max width
        }
        
        // Quality and format optimization
        transformations.push(`q_${quality}`);
        transformations.push('f_auto'); // Auto format (WebP for supported browsers)
        
        // Combine transformations
        const transformStr = transformations.join(',');
        
        // Return optimized URL
        return `${baseUrl}/upload/${transformStr}/${pathAfterUpload}`;
      }
    }

    // Return original if not Cloudinary or can't parse
    return url;
  };

  /**
   * Preload image for instant display
   */
  useEffect(() => {
    if (!imageName) {
      setError(true);
      setLoading(false);
      return;
    }

    const optimizedUrl = getOptimizedImageUrl(imageName);
    
    if (!optimizedUrl) {
      setError(true);
      setLoading(false);
      return;
    }

    // Check if image is in browser cache
    const img = new Image();
    
    img.onload = () => {
      setImgSrc(optimizedUrl);
      setLoading(false);
      setError(false);
    };
    
    img.onerror = () => {
      console.error('❌ Image failed to load:', optimizedUrl);
      setLoading(false);
      setError(true);
    };

    // Start loading
    img.src = optimizedUrl;

    // Cleanup
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageName, quality, cardSize, width, height]);

  // Show placeholder if no image or error
  if (!imageName || error) {
    return (
      <div className={`article-image-placeholder ${className}`}>
        <FiImage size={48} />
        <p>No image available</p>
      </div>
    );
  }

  return (
    <div className={`article-image-container ${className}`}>
      {loading && (
        <div className="article-image-placeholder">
          <div className="image-loader"></div>
        </div>
      )}
      
      {imgSrc && (
        <img
          src={imgSrc}
          alt={title}
          className={`article-image ${loading ? 'loading' : 'loaded'}`}
          loading={lazy ? "lazy" : "eager"}
          width={width}
          height={height}
          // Add cache control via headers (Cloudinary handles this)
          crossOrigin="anonymous"
          decoding="async"
        />
      )}
    </div>
  );
};

export default ArticleImage;