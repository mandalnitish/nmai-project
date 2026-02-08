import "./ArticleSkeleton.css";

const ArticleSkeleton = () => {
  return (
    <div className="article-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-line short"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;
