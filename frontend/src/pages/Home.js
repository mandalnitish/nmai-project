import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { articlesAPI } from "../services/api";
import ArticleCard from "../components/ArticleCard";
import ArticleSkeleton from "../components/ArticleSkeleton";
import { FiSearch, FiTrendingUp, FiChevronRight, FiBookOpen, FiAward } from "react-icons/fi";
import "./Home.css";

/* ─── Date Helpers ─── */
const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";

const isToday = (date) =>
  date && new Date(date).toDateString() === new Date().toDateString();

const isYesterday = (date) => {
  if (!date) return false;
  const y = new Date(); y.setDate(y.getDate() - 1);
  return new Date(date).toDateString() === y.toDateString();
};

const getDateLabel = (date) =>
  isToday(date) ? "Today" : isYesterday(date) ? "Yesterday" : formatDate(date);

const getTodayLabel = () =>
  new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

const getYesterdayLabel = () => {
  const y = new Date(); y.setDate(y.getDate() - 1);
  return y.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
};

/* ─── Categories ─── */
const CATEGORIES = [
  { name: "All",           color: "blue"    },
  { name: "National",      color: "teal"    },
  { name: "International", color: "purple"  },
  { name: "Economy",       color: "amber"   },
  { name: "Polity",        color: "indigo"  },
  { name: "Science",       color: "green"   },
  { name: "Technology",    color: "cyan"    },
  { name: "Environment",   color: "emerald" },
  { name: "Defence",       color: "red"     },
  { name: "Sports",        color: "orange"  },
];

/* ─── Pagination ─── */
const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;
  const pages = [];
  const delta = 1;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) pages.push(i);
    else if (i === page - delta - 1 || i === page + delta + 1) pages.push("…");
  }
  return (
    <div className="pagination">
      <button className="pg-btn pg-nav" disabled={page === 1} onClick={() => onChange(page - 1)}>← Prev</button>
      {[...new Set(pages)].map((p, i) =>
        p === "…"
          ? <span key={`e-${i}`} className="pg-ellipsis">…</span>
          : <button key={p} className={`pg-btn ${page === p ? "active" : ""}`} onClick={() => onChange(p)}>{p}</button>
      )}
      <button className="pg-btn pg-nav" disabled={page === totalPages} onClick={() => onChange(page + 1)}>Next →</button>
    </div>
  );
};

/* ─── ArticleGroup — returns null (no DOM node at all) when empty ─── */
const ArticleGroup = ({ articles, label, date }) => {
  if (!articles || articles.length === 0) return null;
  return (
    <div className="article-group">
      <div className="section-divider">
        <span className="divider-label">{label}</span>
        {date && <span className="divider-date">{date}</span>}
      </div>
      <div className="articles-list">
        {articles.map((a) => (
          <ArticleCard
            key={a._id}
            article={{ ...a, dateLabel: getDateLabel(a.publishDate || a.createdAt) }}
            layout="horizontal"
          />
        ))}
      </div>
    </div>
  );
};

/* ─── Home ─── */
const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles]     = useState([]);
  const [trending, setTrending]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [category, setCategory]     = useState("All");
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const handleHomeReset = () => {
      setCategory("All"); setSearch(""); setSearchParams({ page: 1 });
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("homeReset", handleHomeReset);
    return () => window.removeEventListener("homeReset", handleHomeReset);
  }, [setSearchParams]);

  useEffect(() => {
    const handleCatSelect = (e) => { if (e.detail?.cat) handleCategoryChange(e.detail.cat); };
    window.addEventListener("drawerCategorySelect", handleCatSelect);
    return () => window.removeEventListener("drawerCategorySelect", handleCatSelect);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const [latestRes, trendingRes] = await Promise.all([
          articlesAPI.getAll({ page, limit: 9, category: category === "All" ? "" : category, search }),
          articlesAPI.getTrending(5),
        ]);
        if (!mounted) return;
        setArticles(latestRes.articles || []);
        setTotalPages(latestRes.pagination?.totalPages || 1);
        setTotalCount(latestRes.pagination?.total || 0);
        setTrending(trendingRes.articles || []);
      } catch (err) {
        console.error("Home fetch error:", err);
        setArticles([]); setTrending([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => { mounted = false; };
  }, [page, category, search]);

  const handlePageChange     = (p)   => setSearchParams({ page: p });
  const handleCategoryChange = (cat) => { setCategory(cat); setSearchParams({ page: 1 }); };
  const handleSearchChange   = (val) => { setSearch(val);   setSearchParams({ page: 1 }); };

  const todayArticles     = articles.filter((a) => isToday(a.publishDate || a.createdAt));
  const yesterdayArticles = articles.filter((a) => isYesterday(a.publishDate || a.createdAt));
  const earlierArticles   = articles.filter(
    (a) => !isToday(a.publishDate || a.createdAt) && !isYesterday(a.publishDate || a.createdAt)
  );

  return (
    <>
      <Helmet>
        <title>NMAI – Current Affairs, MCQs & Daily Quiz for UPSC, SSC</title>
        <meta name="description" content="Daily current affairs, MCQs, quizzes and exam-focused analysis for UPSC, SSC, Banking, Railway and State PSC exams." />
        <link rel="canonical" href="https://www.nmai.in/" />
      </Helmet>

      <div className="home-page">
        <div className="home-container">

          {/* Mobile search */}
          <div className="mobile-search-bar">
            <FiSearch className="mobile-search-icon" />
            <input type="text" placeholder="Search current affairs…" value={search}
              onChange={(e) => handleSearchChange(e.target.value)} />
          </div>

          <div className="home-layout">

            {/* LEFT SIDEBAR */}
            <aside className="home-sidebar left">
              <div className="sidebar-search-wrap">
                <div className="sidebar-search-box">
                  <FiSearch className="sidebar-search-icon" />
                  <input type="text" placeholder="Search articles…" value={search}
                    onChange={(e) => handleSearchChange(e.target.value)} />
                </div>
              </div>
              <div className="sidebar-section">
                <div className="sidebar-section-title">Categories</div>
                <ul className="cat-list">
                  {CATEGORIES.map((cat) => (
                    <li key={cat.name}
                      className={`cat-item cat-${cat.color} ${category === cat.name ? "active" : ""}`}
                      onClick={() => handleCategoryChange(cat.name)}>
                      <span className="cat-name">{cat.name}</span>
                      <FiChevronRight className="cat-arrow" />
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="home-content">

              {/* ── No live pill, no header wrapper — articles start immediately ── */}

              {/* Article count pill (only shown, no live dot) */}
              {!loading && totalCount > 0 && (
                <div className="result-count">
                  {totalCount} articles
                  {category !== "All" ? ` in ${category}` : ""}
                  {search ? ` matching "${search}"` : ""}
                </div>
              )}

              {/* Skeletons */}
              {loading && (
                <div className="articles-list">
                  {Array.from({ length: 6 }).map((_, i) => <ArticleSkeleton key={i} />)}
                </div>
              )}

              {/* Empty */}
              {!loading && articles.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">🔍</div>
                  <p className="empty-title">No articles found</p>
                  <p className="empty-sub">Try adjusting your search or category filter.</p>
                </div>
              )}

              {/* Grouped articles — each group returns null when empty, zero phantom nodes */}
              {!loading && articles.length > 0 && (
                <div className="articles-groups">
                  <ArticleGroup articles={todayArticles}     label="Today"     date={getTodayLabel()} />
                  <ArticleGroup articles={yesterdayArticles} label="Yesterday" date={getYesterdayLabel()} />
                  <ArticleGroup articles={earlierArticles}   label="Earlier" />
                  <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
                </div>
              )}

              {/* Mobile trending */}
              {trending.length > 0 && (
                <section className="trending-section mobile-only">
                  <div className="widget-header"><FiTrendingUp /> Trending Now</div>
                  <div className="trending-list">
                    {trending.map((a, i) => (
                      <Link key={a._id} to={`/article/${a.slug}`} className="trending-item">
                        <span className="trending-num">#{i + 1}</span>
                        <div className="trending-body">
                          <h4 className="trending-title">{a.title}</h4>
                          <span className="trending-meta">{formatDate(a.publishDate)} · {a.category}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </main>

            {/* RIGHT SIDEBAR */}
            <aside className="home-sidebar right">
              {trending.length > 0 && (
                <div className="widget-card">
                  <div className="widget-header"><FiTrendingUp className="widget-icon" />Trending Now</div>
                  <div className="trending-list">
                    {trending.map((a, i) => (
                      <Link key={a._id} to={`/article/${a.slug}`} className="trending-item">
                        <span className="trending-num">#{i + 1}</span>
                        <div className="trending-body">
                          <h4 className="trending-title">{a.title}</h4>
                          <span className="trending-meta">{formatDate(a.publishDate)} · {a.category}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <div className="widget-card">
                <div className="widget-header"><FiBookOpen className="widget-icon" />E-Books</div>
                <div className="widget-links">
                  <Link to="/ebooks/monthly-mcqs" className="widget-link">Monthly MCQs <FiChevronRight /></Link>
                  <Link to="/ebooks/ca-articles-mcqs" className="widget-link">Articles + MCQs <FiChevronRight /></Link>
                  <Link to="/ebooks/yearly-pdf" className="widget-link">Yearly PDF <FiChevronRight /></Link>
                </div>
              </div>
              <div className="widget-card">
                <div className="widget-header"><FiAward className="widget-icon" />Exam Focus</div>
                <div className="widget-links">
                  {["UPSC", "SSC", "Banking", "Railway", "State PSC"].map((exam) => (
                    <Link key={exam} to={`/exams/${exam.toLowerCase().replace(" ", "-")}`} className="widget-link">
                      {exam} <FiChevronRight />
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  );
};

export default Home;