// utils/imageUtils.js

/**
 * Get article image URL with fallback support
 * Checks for multiple image formats: jpg, jpeg, png, webp
 * Returns the first available format or a fallback image
 */

export const getArticleImageUrl = (imageName, fallbackUrl = '/images/placeholder.jpg') => {
  if (!imageName) return fallbackUrl;
  
  // Remove any existing extension
  const baseImageName = imageName.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  
  // Return the base path - let the browser handle the extension
  return `/images/articles/${baseImageName}.png`;
};

/**
 * Check if image exists and return appropriate src
 * This is a client-side check that will fallback to placeholder
 */
export const getImageWithFallback = (imagePath, fallbackPath = '/images/placeholder.jpg') => {
  return imagePath || fallbackPath;
};

/**
 * Handle image error - set fallback image
 */
export const handleImageError = (event) => {
  event.target.src = '/images/placeholder.jpg';
  event.target.alt = 'Image not available';
};

/**
 * Preload image to check if it exists
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error('Image failed to load'));
    img.src = src;
  });
};