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
    return <p style={{ padding: "2rem" }}>Loading article...</p>;
  }

  if (!data || !data.success || !article) {
    return (
      <div className="error-container">
        <h2>Article not found</h2>
        <Link to="/current-affairs" className="back-link">
          <FiArrowLeft /> Back to Articles
        </Link>
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
    } finally {
      setIsLiking(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied");
  };

  return (
    <>
      {/* ================= SEO ================= */}
      <Helmet>
        <title>{article.title} | NMAI</title>
        <meta name="description" content={article.summary} />

        {/* Open Graph */}
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
          <Link to="/current-affairs" className="back-link">
            <FiArrowLeft /> Back to Articles
          </Link>

          <h1 className="article-detail-title">{article.title}</h1>

          <div className="article-detail-meta">
            <span>
              <FiCalendar /> {formatDate(article.publishDate)}
            </span>
            <span>
              <FiUser /> {article.author?.name || "Admin"}
            </span>
            <span>
              <FiEye /> {article.viewCount}
            </span>
            <span>
              <FiHeart /> {article.likes}
            </span>
          </div>

          <img
            className="article-detail-image"
            src={
              article.featuredImage?.url ||
              `https://source.unsplash.com/900x450/?${
                article.category || "news"
              }`
            }
            alt={article.title}
          />

          {article.summary && (
            <div className="article-summary">{article.summary}</div>
          )}

          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="article-actions">
            <button onClick={handleSaveArticle}>
              <FiBookmark /> {isSaved ? "Saved" : "Save"}
            </button>
            <button onClick={handleLike}>
              <FiHeart /> Like
            </button>
            <button onClick={handleShare}>
              <FiShare2 /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
