import React, { useState, useEffect } from "react";
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

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const isToday = (date) => {
  if (!date) return false;
  const d = new Date(date);
  const t = new Date();
  return d.toDateString() === t.toDateString();
};

const isYesterday = (date) => {
  if (!date) return false;
  const d = new Date(date);
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return d.toDateString() === y.toDateString();
};

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

      {[...Array(totalPages)].map((_, i) => {
        const p = i + 1;
        return (
          <button
            key={p}
            className={p === page ? "active" : ""}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        );
      })}

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

  /* ================= SCROLL TO TOP ON PAGE CHANGE ================= */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  /* ================= SYNC PAGE TO URL ================= */
  useEffect(() => {
    setSearchParams({ page });
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

        if (mounted) {
          setArticles(latestRes.data || []);
          setTotalPages(latestRes.pagination?.totalPages || 1);
          setTrending(trendingRes.data || []);
        }
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

  const todayArticles = articles.filter((a) =>
    isToday(a.publishDate || a.createdAt)
  );

  const yesterdayArticles = articles.filter((a) =>
    isYesterday(a.publishDate || a.createdAt)
  );

  const earlierArticles = articles.filter(
    (a) =>
      !isToday(a.publishDate || a.createdAt) &&
      !isYesterday(a.publishDate || a.createdAt)
  );

  /* ================= MCQs ================= */

  const mcqs = [
    { q: "Who presents the Union Budget in India?", a: "Finance Minister" },
    { q: "Which mission promotes AI development in India?", a: "National AI Mission" },
    { q: "Which institution controls monetary policy in India?", a: "Reserve Bank of India" },
  ];

  return (
    <div className="gk-layout">
      {/* ================= LEFT SIDEBAR ================= */}
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

      {/* ================= MAIN ================= */}
      <main className="gk-content">
        {/* HERO */}
        <section className="hero-section">
          <h1 className="hero-title">
            Master Current Affairs for <br />
            <span className="gradient-text">Competitive Exams</span>
          </h1>

          <p className="hero-subtitle">
            Daily current affairs, MCQs, and exam-focused content for UPSC,
            SSC, Banking, Railway, and State PSC exams.
          </p>

          <div className="hero-buttons">
            <Link to="/current-affairs" className="btn btn-primary">
              <FiBookOpen /> Explore Current Affairs
            </Link>
            <Link to="/daily-quiz" className="btn btn-outline">
              <FiTarget /> Take Daily Quiz
            </Link>
          </div>
        </section>

        {/* ================= LATEST ================= */}
        <section className="section">
          <h2>Latest Current Affairs</h2>

          {loading && <p>Loading articles...</p>}

          {!loading && todayArticles.length > 0 && (
            <>
              <h3 className="group-title">Today</h3>
              <div className="articles-grid">
                {todayArticles.map((a) => (
                  <ArticleCard
                    key={a._id}
                    article={{
                      ...a,
                      dateLabel: getDateLabel(a.publishDate || a.createdAt),
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {!loading && yesterdayArticles.length > 0 && (
            <>
              <h3 className="group-title">Yesterday</h3>
              <div className="articles-grid">
                {yesterdayArticles.map((a) => (
                  <ArticleCard
                    key={a._id}
                    article={{
                      ...a,
                      dateLabel: getDateLabel(a.publishDate || a.createdAt),
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {!loading && earlierArticles.length > 0 && (
            <>
              <h3 className="group-title">Earlier</h3>
              <div className="articles-grid">
                {earlierArticles.map((a) => (
                  <ArticleCard
                    key={a._id}
                    article={{
                      ...a,
                      dateLabel: getDateLabel(a.publishDate || a.createdAt),
                    }}
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

        {/* ================= TRENDING ================= */}
        {trending.length > 0 && (
          <section className="section">
            <h2>
              <FiTrendingUp /> Trending This Week
            </h2>

            <div className="trending-grid">
              {trending.map((a, i) => (
                <Link
                  key={a._id}
                  to={`/article/${a.slug}`}
                  className="trending-item"
                >
                  <span className="trending-number">#{i + 1}</span>
                  <div>
                    <h3>{a.title}</h3>
                    <div className="trending-meta">
                      <span>{a.category}</span>
                      <span className="trending-date">
                        {getDateLabel(a.publishDate || a.createdAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ================= MCQs ================= */}
        <section className="section">
          <h2>Quick MCQs</h2>
          <div className="mcq-grid">
            {mcqs.map((m, i) => (
              <div key={i} className="mcq-card">
                <p><strong>Q.</strong> {m.q}</p>
                <p className="answer">Answer: {m.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ================= RIGHT SIDEBAR ================= */}
      <aside className="gk-sidebar right">
        <input
          type="text"
          className="gk-search"
          placeholder="Search current affairs..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <div className="sidebar-card">
          <h3>E-Books</h3>
          <ul>
            <li><Link to="/ebooks/monthly-mcqs">Current Affairs Monthly MCQs</Link></li>
            <li><Link to="/ebooks/ca-articles-mcqs">CA Articles + MCQs</Link></li>
            <li><Link to="/ebooks/yearly-pdf">Yearly Current Affairs PDF</Link></li>
          </ul>
        </div>

        <div className="sidebar-card">
          <h3>States PSC</h3>
          <ul>
            <li><Link to="/exams/upsc">UPSC</Link></li>
            <li><Link to="/exams/ssc">SSC</Link></li>
            <li><Link to="/exams/banking">Banking</Link></li>
            <li><Link to="/exams/railway">Railway</Link></li>
            <li><Link to="/exams/state-psc">State PSC</Link></li>
            <li><Link to="/exams/gpsc">GPSC</Link></li>
            <li><Link to="/exams/bpsc">BPSC</Link></li>
            <li><Link to="/exams/mppsc">MPPSC</Link></li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Home;
