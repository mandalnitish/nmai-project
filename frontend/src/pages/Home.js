import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { articlesAPI } from "../services/api";
import ArticleCard from "../components/ArticleCard";
import {
  FiBookOpen,
  FiTrendingUp,
  FiTarget,
} from "react-icons/fi";
import "./Home.css";
import "./GKTodayLayout.css";

/* ================= DATE HELPERS ================= */

const isToday = (date) => {
  const d = new Date(date);
  const t = new Date();
  return d.toDateString() === t.toDateString();
};

const isYesterday = (date) => {
  const d = new Date(date);
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return d.toDateString() === y.toDateString();
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const getDateLabel = (date) => {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return formatDate(date);
};

/* ================= PAGINATION ================= */

const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>
        Prev
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

/* ================= HOME ================= */

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromURL = Number(searchParams.get("page")) || 1;

  const [articles, setArticles] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(pageFromURL);
  const [totalPages, setTotalPages] = useState(1);

  /* ================= SYNC PAGE ================= */
  useEffect(() => {
    setSearchParams({ page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, setSearchParams]);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [latestRes, trendingRes] = await Promise.all([
          articlesAPI.getAll({
            page,
            limit: 9,
            category: category === "All" ? "" : category,
            search,
          }),
          articlesAPI.getTrending(5),
        ]);

        if (!mounted) return;

        setArticles(latestRes.articles || []);
        setTotalPages(latestRes.pagination?.totalPages || 1);
        setTrending(trendingRes.data || []);
      } catch (err) {
        console.error("Home fetch error:", err);
      } finally {
        mounted && setLoading(false);
      }
    };

    fetchData();
    return () => (mounted = false);
  }, [page, category, search]);

  /* ================= GROUP ARTICLES ================= */

  const today = articles.filter((a) =>
    isToday(a.publishDate || a.createdAt)
  );
  const yesterday = articles.filter((a) =>
    isYesterday(a.publishDate || a.createdAt)
  );
  const earlier = articles.filter(
    (a) =>
      !isToday(a.publishDate || a.createdAt) &&
      !isYesterday(a.publishDate || a.createdAt)
  );

  return (
    <div className="gk-layout">
      {/* LEFT SIDEBAR */}
      <aside className="gk-sidebar left">
        <h3>Categories</h3>
        <ul>
          {[
            "All",
            "Economy",
            "Polity",
            "Science",
            "Technology",
            "Environment",
            "International",
            "National",
            "Defence",
          ].map((cat) => (
            <li
              key={cat}
              className={category === cat ? "active" : ""}
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* MAIN */}
      <main className="gk-content">
        {/* HERO */}
        <section className="hero-section">
          <h1 className="hero-title">
            Master Current Affairs for <br />
            <span className="gradient-text">Competitive Exams</span>
          </h1>

          <div className="hero-buttons">
            <Link to="/current-affairs" className="btn btn-primary">
              <FiBookOpen /> Explore Current Affairs
            </Link>
            <Link to="/daily-quiz" className="btn btn-outline">
              <FiTarget /> Take Daily Quiz
            </Link>
          </div>
        </section>

        {/* ARTICLES */}
        <section className="section">
          <h2>Latest Current Affairs</h2>

          {loading && <p>Loading articles...</p>}

          {!loading && today.length > 0 && (
            <>
              <h3>Today</h3>
              <div className="articles-grid">
                {today.map((a) => (
                  <ArticleCard
                    key={a._id}
                    article={{ ...a, dateLabel: getDateLabel(a.publishDate || a.createdAt) }}
                  />
                ))}
              </div>
            </>
          )}

          {!loading && yesterday.length > 0 && (
            <>
              <h3>Yesterday</h3>
              <div className="articles-grid">
                {yesterday.map((a) => (
                  <ArticleCard
                    key={a._id}
                    article={{ ...a, dateLabel: getDateLabel(a.publishDate || a.createdAt) }}
                  />
                ))}
              </div>
            </>
          )}

          {!loading && earlier.length > 0 && (
            <>
              <h3>Earlier</h3>
              <div className="articles-grid">
                {earlier.map((a) => (
                  <ArticleCard
                    key={a._id}
                    article={{ ...a, dateLabel: getDateLabel(a.publishDate || a.createdAt) }}
                  />
                ))}
              </div>
            </>
          )}

          {!loading && articles.length === 0 && (
            <div className="empty-state">No articles found.</div>
          )}

          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </section>

        {/* TRENDING */}
        {trending.length > 0 && (
          <section className="section">
            <h2>
              <FiTrendingUp /> Trending This Week
            </h2>

            <div className="trending-grid">
              {trending.map((a, i) => (
                <Link key={a._id} to={`/article/${a.slug}`} className="trending-item">
                  <span>#{i + 1}</span>
                  <div>
                    <h3>{a.title}</h3>
                    <span>{getDateLabel(a.publishDate || a.createdAt)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="gk-sidebar right">
        <input
          className="gk-search"
          placeholder="Search current affairs..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </aside>
    </div>
  );
};

export default Home;
