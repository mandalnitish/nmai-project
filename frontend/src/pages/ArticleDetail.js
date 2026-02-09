// pages/ArticleDetail.js
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

import ArticleImage from "../components/ArticleImage";
import "./ArticleDetail.css";

/* ================= COMPONENT ================= */
const ArticleDetail = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [isSaved, setIsSaved] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  /* ================= FETCH ARTICLE ================= */
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

  /* ================= HELPERS ================= */
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = parseISO(dateString);
    return isValid(date) ? format(date, "MMMM dd, yyyy") : "";
  };

  const getImageName = (url) => {
    if (!url) return null;
    return url.split("/").pop(); // IMPORTANT
  };

  /* ================= STATES ================= */
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
          <p>The article you're looking for doesn't exist or was removed.</p>
          <Link to="/current-affairs" className="back-link-btn">
            <FiArrowLeft /> Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  /* ================= ACTIONS ================= */
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
      toast.success(prev ? "Removed from saved" : "Article saved");
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
    } catch {
      toast.error("Failed to like article");
    } finally {
      setIsLiking(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  /* ================= RENDER ================= */
  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>{article.title} | NMAI</title>
        <meta name="description" content={article.summary} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="article-detail-page">
        <div className="article-detail-container">
          {/* Back */}
          <Link to="/current-affairs" className="back-link">
            <FiArrowLeft /> Back to Articles
          </Link>

          {/* Category */}
          {article.category && (
            <div className="article-category-badge-large">
              {article.category}
            </div>
          )}

          {/* Title */}
          <h1 className="article-detail-title">{article.title}</h1>

          {/* Meta */}
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

          {/* FEATURED IMAGE (FIXED) */}
          <div className="article-image-wrapper">
            <ArticleImage
              imageName={getImageName(article.featuredImage?.url)}
              title={article.title}
              className="article-detail-image"
              width={1200}
              height={600}
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

          {/* Actions */}
          <div className="article-actions">
            <button
              className={`action-btn ${isSaved ? "active" : ""}`}
              onClick={handleSaveArticle}
            >
              <FiBookmark /> {isSaved ? "Saved" : "Save"}
            </button>

            <button
              className="action-btn"
              onClick={handleLike}
              disabled={isLiking}
            >
              <FiHeart /> Like
            </button>

            <button className="action-btn" onClick={handleShare}>
              <FiShare2 /> Share
            </button>
          </div>

          {/* Exam relevance */}
          {article.examRelevance?.length > 0 && (
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
