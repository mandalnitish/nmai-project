import React, { useState } from "react";
import { Link } from "react-router-dom";
import articles from "../data/articles";
import "./GKTodayLayout.css";

export default function CurrentAffairsLayout() {
  const [search, setSearch] = useState("");

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="layout-container">
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="sidebar">
        <h3>Current Affairs</h3>
        <ul>
          <li>Daily MCQs</li>
          <li>Daily CA Quiz</li>
          <li>Monthly MCQs</li>
          <li>Government Schemes</li>
          <li>Economy & Banking</li>
          <li>Environment</li>
          <li>Awards & Honours</li>
        </ul>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="content">
        <h1>Latest Current Affairs</h1>

        <input
          className="search-box"
          type="text"
          placeholder="Search current affairs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredArticles.length === 0 && (
          <p className="empty-text">No matching articles found.</p>
        )}

        {filteredArticles.slice(0, 8).map((article) => (
          <GKArticleCard key={article.id} article={article} />
        ))}

        <div className="older-wrap">
          <Link to="/current-affairs" className="older-posts">
            View Older Posts →
          </Link>
        </div>
      </main>

      {/* ================= RIGHT SIDEBAR ================= */}
      <aside className="sidebar">
        <h3>E-Books</h3>
        <ul>
          <li>Current Affairs Monthly MCQs</li>
          <li>CA Articles + MCQs</li>
          <li>Yearly Current Affairs PDF</li>
        </ul>

        <h3 style={{ marginTop: "1.2rem" }}>State PSC</h3>
        <ul>
          <li>UPSC</li>
          <li>GPSC</li>
          <li>BPSC</li>
          <li>MPPSC</li>
        </ul>
      </aside>
    </div>
  );
}

/* ================= ARTICLE CARD ================= */

function GKArticleCard({ article }) {
  return (
    <article className="article-card">
      <img
        src="https://images.unsplash.com/featured/?india,news"
        alt={article.title}
        loading="lazy"
      />

      <div>
        <Link to={`/article/${article.slug}`}>
          <h2>{article.title}</h2>
        </Link>

        <span className="meta">
          {new Date(article.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
          {" • "}
          {article.category}
        </span>

        <p>{article.content.trim().slice(0, 140)}…</p>
      </div>
    </article>
  );
}
