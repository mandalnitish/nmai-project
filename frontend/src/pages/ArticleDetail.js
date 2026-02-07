import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { Helmet } from "react-helmet-async";
import { articlesAPI, usersAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { format, isValid, parseISO } from "date-fns";
import {
  FiCalendar,
  FiUser,
  FiBookmark,
  FiHeart,
  FiShare2,
  FiArrowLeft,
  FiEye,
} from "react-icons/fi";
import "./ArticleDetail.css";

const ArticleDetail = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [isSaved, setIsSaved] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const { data, isLoading } = useQuery(
    ["article", slug],
    () => articlesAPI.getBySlug(slug),
    {
      retry: false,
      onSuccess: (res) => {
        if (res?.success && user?.savedArticles) {
          setIsSaved(user.savedArticles.includes(res.article._id));
        }
      },
    }
  );

  const article = data?.article;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = parseISO(dateString);
    return isValid(date) ? format(date, "MMMM dd, yyyy") : "";
  };

  if (isLoading) {
    return (
      <div className="article-loading">
        <div className="spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (!data || !data.success || !article) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>Article not found</h2>
          <p>The article you're looking for doesn't exist or has been removed.</p>
          <Link to="/current-affairs" className="back-link-btn">
            <FiArrowLeft /> Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveArticle = async () => {
    if (!user) return toast.error("Please login to save articles");

    const prev = isSaved;
    setIsSaved(!prev);

    try {
      prev
        ? await usersAPI.unsaveArticle(article._id)
        : await usersAPI.saveArticle(article._id);

      queryClient.invalidateQueries("me");
      queryClient.invalidateQueries("savedArticles");
      toast.success(prev ? "Article removed from saved" : "Article saved successfully");
    } catch {
      setIsSaved(prev);
      toast.error("Failed to update saved article");
    }
  };

  const handleLike = async () => {
    if (!user) return toast.error("Please login to like articles");
    if (isLiking) return;

    setIsLiking(true);
    try {
      await articlesAPI.like(article._id);
      queryClient.invalidateQueries(["article", slug]);
      toast.success("Article liked!");
    } catch (err) {
      toast.error("Failed to like article");
    } finally {
      setIsLiking(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  return (
    <>
      {/* ================= SEO ================= */}
      <Helmet>
        <title>{article.title} | NMAI</title>
        <meta name="description" content={article.summary} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta
          property="og:image"
          content={
            article.featuredImage?.url ||
            "https://nmai-project.vercel.app/android-chrome-512x512.png"
          }
        />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="article-detail-page">
        <div className="article-detail-container">
          {/* Back button */}
          <Link to="/current-affairs" className="back-link">
            <FiArrowLeft /> Back to Articles
          </Link>

          {/* Category badge */}
          {article.category && (
            <div className="article-category-badge-large">
              {article.category}
            </div>
          )}

          {/* Title */}
          <h1 className="article-detail-title">{article.title}</h1>

          {/* Meta information */}
          <div className="article-detail-meta">
            <span className="meta-item">
              <FiCalendar /> {formatDate(article.publishDate)}
            </span>
            <span className="meta-item">
              <FiUser /> {article.author?.name || "Admin"}
            </span>
            <span className="meta-item">
              <FiEye /> {article.viewCount || 0} views
            </span>
            <span className="meta-item">
              <FiHeart /> {article.likes || 0} likes
            </span>
          </div>

          {/* Featured image */}
          <div className="article-image-wrapper">
            <img
              className="article-detail-image"
              src={
                article.featuredImage?.url ||
                `https://source.unsplash.com/1200x600/?${
                  article.category || "news"
                }`
              }
              alt={article.title}
              onError={(e) => {
                e.target.src = "https://source.unsplash.com/1200x600/?current-affairs";
              }}
            />
          </div>

          {/* Summary */}
          {article.summary && (
            <div className="article-summary">
              <div className="summary-icon">💡</div>
              <div className="summary-text">{article.summary}</div>
            </div>
          )}

          {/* Content */}
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Action buttons */}
          <div className="article-actions">
            <button 
              className={`action-btn ${isSaved ? 'active' : ''}`}
              onClick={handleSaveArticle}
              title={isSaved ? "Remove from saved" : "Save article"}
            >
              <FiBookmark /> {isSaved ? "Saved" : "Save"}
            </button>
            <button 
              className="action-btn"
              onClick={handleLike}
              disabled={isLiking}
              title="Like article"
            >
              <FiHeart /> Like
            </button>
            <button 
              className="action-btn"
              onClick={handleShare}
              title="Share article"
            >
              <FiShare2 /> Share
            </button>
          </div>

          {/* Exam relevance tags */}
          {article.examRelevance && article.examRelevance.length > 0 && (
            <div className="exam-tags">
              <h4>Relevant for:</h4>
              <div className="tag-list">
                {article.examRelevance.map((exam, idx) => (
                  <span key={idx} className="exam-tag">
                    {exam}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;