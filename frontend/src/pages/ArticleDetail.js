// ArticleDetail.jsx – SAVE SYNCED WITH PROFILE
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { articlesAPI, usersAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { format, isValid, parseISO } from "date-fns";
import {
  FiCalendar,
  FiUser,
  FiTag,
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

  /* ================= FETCH ARTICLE ================= */
  const { data, isLoading, error } = useQuery(
    ["article", slug],
    () => articlesAPI.getBySlug(slug),
    {
      retry: 1,
      onSuccess: (res) => {
        if (res?.success && user?.savedArticles) {
          setIsSaved(user.savedArticles.includes(res.data._id));
        }
      },
      onError: () => toast.error("Failed to load article"),
    }
  );

  const article = data?.data;

  /* ================= DATE FORMAT ================= */
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    try {
      const date =
        typeof dateString === "string"
          ? parseISO(dateString)
          : new Date(dateString);
      return isValid(date) ? format(date, "MMMM dd, yyyy") : "Invalid date";
    } catch {
      return "Date not available";
    }
  };

  /* ================= SAVE / UNSAVE ================= */
  const handleSaveArticle = async () => {
    if (!user) {
      toast.error("Please login to save articles");
      return;
    }

    const prev = isSaved;
    setIsSaved(!prev); // optimistic UI

    try {
      if (prev) {
        await usersAPI.unsaveArticle(article._id);
        toast.success("Removed from saved");
      } else {
        await usersAPI.saveArticle(article._id);
        toast.success("Article saved");
      }

      // 🔥 SYNC PROFILE + NAVBAR + ANYWHERE
      queryClient.invalidateQueries("savedArticles");
      queryClient.invalidateQueries("me");
    } catch {
      setIsSaved(prev); // rollback
      toast.error("Failed to update saved article");
    }
  };

  /* ================= LIKE ================= */
  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like articles");
      return;
    }

    try {
      await articlesAPI.like(article._id);
      toast.success("Article liked");
    } catch {
      toast.error("Failed to like article");
    }
  };

  /* ================= SHARE ================= */
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  /* ================= STATES ================= */
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Loading article...</p>
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="error-container">
        <h2>Article not found</h2>
        <Link to="/current-affairs" className="btn btn-primary">
          <FiArrowLeft /> Back to Articles
        </Link>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="article-detail-page">
      <div className="container">
        <Link to="/current-affairs" className="back-link">
          <FiArrowLeft /> Back to Articles
        </Link>

        <article className="article-content">
          {/* HEADER */}
          <header className="article-header">
            {article.category && (
              <div className="article-category-badge">
                {article.category}
              </div>
            )}

            <h1 className="article-title">{article.title}</h1>

            <div className="article-meta">
              {article.publishDate && (
                <span>
                  <FiCalendar /> {formatDate(article.publishDate)}
                </span>
              )}
              <span>
                <FiUser /> {article.author?.name || "Admin"}
              </span>
              <span>
                <FiEye /> {article.viewCount || 0}
              </span>
              <span>
                <FiHeart /> {article.likes || 0}
              </span>
            </div>

            {article.examRelevance?.length > 0 && (
              <div className="exam-tags">
                <strong>Relevant for:</strong>
                {article.examRelevance.map((exam, i) => (
                  <span key={i} className="exam-tag">
                    {exam}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* IMAGE */}
          <div className="featured-image">
            <img
              src={
                article.featuredImage?.url ||
                `https://source.unsplash.com/random/800x400?${article.category}`
              }
              alt={article.title}
            />
          </div>

          {/* SUMMARY */}
          {article.summary && (
            <div className="article-summary">
              <h3>Summary</h3>
              <p>{article.summary}</p>
            </div>
          )}

          {/* CONTENT */}
          {article.content && (
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}

          {/* TAGS */}
          {article.tags?.length > 0 && (
            <div className="article-tags">
              <strong>Tags:</strong>
              {article.tags.map((tag, i) => (
                <span key={i} className="tag">
                  <FiTag /> {tag}
                </span>
              ))}
            </div>
          )}

          {/* ACTIONS */}
          <div className="article-actions">
            <button
              className={`action-btn ${isSaved ? "active" : ""}`}
              onClick={handleSaveArticle}
            >
              <FiBookmark /> {isSaved ? "Saved" : "Save Article"}
            </button>

            <button className="action-btn" onClick={handleLike}>
              <FiHeart /> Like
            </button>

            <button className="action-btn" onClick={handleShare}>
              <FiShare2 /> Share
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticleDetail;
