// pages/ArticleDetail.js

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { Helmet } from "react-helmet-async";
import { articlesAPI, usersAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { format, isValid, parseISO } from "date-fns";
import {
  FiCalendar, FiUser, FiBookmark,
  FiHeart, FiShare2, FiArrowLeft, FiEye,
} from "react-icons/fi";

import ArticleImage from "../components/ArticleImage";
import "./ArticleDetail.css";
import AuthorBox from "../components/AuthorBox";

const ArticleDetail = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [isSaved, setIsSaved] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  /* ── Make the gk-layout grid collapse to full-width for article pages ── */
  useEffect(() => {
    const layout = document.querySelector(".gk-layout");
    if (layout) layout.classList.add("gk-layout--article");
    return () => {
      if (layout) layout.classList.remove("gk-layout--article");
    };
  }, []);

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

  const getImageUrl = () =>
    article?.featuredImage?.url || "https://www.nmai.in/logo.png";

  const canonicalUrl = article?.slug
    ? `https://www.nmai.in/article/${article.slug}`
    : "https://www.nmai.in/";

  const authorName = article?.author?.name || "Nitish Mandal";

  if (isLoading) {
    return (
      <div className="article-loading">
        <div className="spinner" />
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

  const handleSaveArticle = async () => {
    if (!user) return toast.error("Please login to save articles");
    const prev = isSaved;
    setIsSaved(!prev);
    try {
      prev ? await usersAPI.unsaveArticle(article._id) : await usersAPI.saveArticle(article._id);
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
    try {
      if (navigator.share) {
        await navigator.share({ title: article.title, text: article.summary, url: canonicalUrl });
      } else {
        await navigator.clipboard.writeText(canonicalUrl);
        toast.success("Link copied to clipboard");
      }
    } catch {
      toast.error("Failed to share article");
    }
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | NMAI Current Affairs</title>
        <meta name="description" content={article.summary} />
        <meta name="keywords" content={`${article.category}, Current Affairs, UPSC, SSC, Banking, NMAI`} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={getImageUrl()} />
        <meta property="og:image:alt" content={article.title} />
        <meta property="og:site_name" content="NMAI Current Affairs" />
        <meta property="og:locale" content="en_IN" />
        <meta property="article:published_time" content={article.publishDate} />
        <meta property="article:modified_time" content={article.updatedAt || article.publishDate} />
        <meta property="article:author" content={authorName} />
        <meta property="article:section" content={article.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.summary} />
        <meta name="twitter:image" content={getImageUrl()} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.nmai.in/" },
              { "@type": "ListItem", position: 2, name: "Current Affairs", item: "https://www.nmai.in/current-affairs" },
              { "@type": "ListItem", position: 3, name: article.title, item: canonicalUrl },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "@id": canonicalUrl,
              mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
              headline: article.title,
              description: article.summary,
              image: [getImageUrl()],
              author: {
                "@type": "Person",
                name: authorName,
                url: "https://www.nmai.in/about-us",
              },
              publisher: {
                "@type": "Organization",
                name: "NMAI",
                url: "https://www.nmai.in",
                logo: { "@type": "ImageObject", url: "https://www.nmai.in/logo.png" },
              },
              datePublished: article.publishDate ? new Date(article.publishDate).toISOString() : undefined,
              dateModified: article.updatedAt
                ? new Date(article.updatedAt).toISOString()
                : article.publishDate ? new Date(article.publishDate).toISOString() : undefined,
              articleSection: article.category || "Current Affairs",
              inLanguage: "en-IN",
              isAccessibleForFree: true,
            },
            (key, value) => (value === undefined ? undefined : value)
          )}
        </script>
      </Helmet>

      <div className="article-detail-page">
        <div className="article-detail-container">

          {/* Back */}
          <Link to="/current-affairs" className="back-link">
            <FiArrowLeft /> Back to Articles
          </Link>

          {/* Category */}
          {article.category && (
            <div className="article-category-badge-large">{article.category}</div>
          )}

          {/* Title */}
          <h1 className="article-detail-title">{article.title}</h1>

          {/* Meta */}
          <div className="article-detail-meta">
            <span className="meta-item"><FiCalendar /> {formatDate(article.publishDate)}</span>
            <span className="meta-item"><FiUser /> {authorName}</span>
            <span className="meta-item"><FiEye /> {article.viewCount || 0} views</span>
            <span className="meta-item"><FiHeart /> {article.likes || 0} likes</span>
          </div>

          {/* Content area — float layout */}
          <div className="article-content-area">

            {/* Floated image — 450px, no caption */}
            <div className="article-image-float">
              <div className="article-image-wrapper">
                <ArticleImage
                  imageName={getImageUrl()}
                  title={article.title}
                  className="article-detail-image"
                  width={900}
                  height={600}
                />
              </div>
            </div>

            {/* Body text */}
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

          </div>

          {/* Exam Relevance */}
          {article.examRelevance?.length > 0 && (
            <div className="exam-tags">
              <h4>Relevant for:</h4>
              <div className="tag-list">
                {article.examRelevance.map((exam, i) => (
                  <span key={i} className="exam-tag">{exam}</span>
                ))}
              </div>
            </div>
          )}

          {/* Author Box */}
          <AuthorBox />

          {/* Actions */}
          <div className="article-actions">
            <button
              className={`action-btn ${isSaved ? "active" : ""}`}
              onClick={handleSaveArticle}
            >
              <FiBookmark /> {isSaved ? "Saved" : "Save"}
            </button>
            <button className="action-btn" onClick={handleLike} disabled={isLiking}>
              <FiHeart /> Like
            </button>
            <button className="action-btn" onClick={handleShare}>
              <FiShare2 /> Share
            </button>
          </div>

          {/* Related Articles */}
          {article.related?.length > 0 && (
            <div className="related-articles">
              <h3>Related Articles</h3>
              <ul>
                {article.related.map((rel) => (
                  <li key={rel._id}>
                    <Link to={`/article/${rel.slug}`}>{rel.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default ArticleDetail;