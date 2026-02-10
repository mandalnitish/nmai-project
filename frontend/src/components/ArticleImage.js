import React, { useState, useEffect, useCallback } from "react";
import { FiImage } from "react-icons/fi";
import "./ArticleImage.css";

/**
 * Optimized ArticleImage Component
 * - Aggressive caching
 * - Cloudinary transformations
 * - Progressive image loading
 * - CI / ESLint safe
 */
const ArticleImage = ({
  imageName,
  title = "Article Image",
  className = "",
  width,
  height,
  lazy = true,
  quality = "auto:good",
  cardSize = false
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);

  /**
   * Memoized Cloudinary optimizer
   */
  const getOptimizedImageUrl = useCallback(
    (url) => {
      if (!url) return null;

      // Optimize only Cloudinary URLs
      if (url.includes("res.cloudinary.com")) {
        const parts = url.split("/upload/");
        if (parts.length === 2) {
          const [baseUrl, pathAfterUpload] = parts;

          const transformations = [];

          // Size optimization
          if (cardSize) {
            transformations.push("w_400,h_250,c_fill,g_auto");
          } else if (width && height) {
            transformations.push(`w_${width},h_${height},c_limit`);
          } else {
            transformations.push("w_1200,c_limit");
          }

          // Quality & format
          transformations.push(`q_${quality}`);
          transformations.push("f_auto");

          return `${baseUrl}/upload/${transformations.join(",")}/${pathAfterUpload}`;
        }
      }

      // Fallback for non-Cloudinary URLs
      return url;
    },
    [cardSize, width, height, quality]
  );

  /**
   * Preload and cache image
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

    const img = new Image();

    img.onload = () => {
      setImgSrc(optimizedUrl);
      setLoading(false);
      setError(false);
    };

    img.onerror = () => {
      console.error("❌ Image failed to load:", optimizedUrl);
      setLoading(false);
      setError(true);
    };

    img.src = optimizedUrl;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageName, getOptimizedImageUrl]);

  /**
   * Error / placeholder state
   */
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
          <div className="image-loader" />
        </div>
      )}

      {imgSrc && (
        <img
          src={imgSrc}
          alt={title}
          className={`article-image ${loading ? "loading" : "loaded"}`}
          loading={lazy ? "lazy" : "eager"}
          width={width}
          height={height}
          decoding="async"
          crossOrigin="anonymous"
        />
      )}
    </div>
  );
};

export default ArticleImage;
