import React from "react";
import "./ArticleSkeleton.css";

const ArticleSkeleton = () => (
  <div className="as-card" aria-hidden="true">
    <div className="as-thumb" />
    <div className="as-body">
      <div className="as-meta">
        <div className="as-shimmer as-badge" />
        <div className="as-shimmer as-date" />
      </div>
      <div className="as-shimmer as-title" />
      <div className="as-shimmer as-title as-short" />
      <div className="as-shimmer as-line" />
      <div className="as-shimmer as-line as-line-short" />
      <div className="as-shimmer as-read-more" />
    </div>
  </div>
);

export default ArticleSkeleton;