import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { articlesAPI } from "../services/api";
import ArticleCard from "../components/ArticleCard";
import { FiBookOpen, FiTrendingUp, FiTarget, FiMenu, FiX } from "react-icons/fi";
import "./Home.css";

/* ================= DATE HELPERS ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

const isToday = (date) =>
  date && new Date(date).toDateString() === new Date().toDateString();

const isYesterday = (date) => {
  if (!date) return false;
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return new Date(date).toDateString() === y.toDateString();
};

const getDateLabel = (date) =>
  isToday(date) ? "Today" : isYesterday(date) ? "Yesterday" : formatDate(date);

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
      <button disabled={page === totalPages} onClick={() => onChange(page + 1)}>
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
  const [trending, setTrending] = useState([]); // UI preserved
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [page, setPage] = useState(pageFromURL);
  const [totalPages, setTotalPages] = useState(1);

  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);

  /* ================= FETCH DATA (FIXED, SAFE) ================= */
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const latestRes = await articlesAPI.getAll({
          page,
          limit: 9,
          category: category === "All" ? "" : category,
          search,
        });

        if (!mounted) return;

        setArticles(latestRes.articles || []);
        setTotalPages(latestRes.pagination?.totalPages || 1);

        // keep trending UI but don’t break page
        setTrending([]);
      } catch (err) {
        console.error("Home fetch error:", err);
        setArticles([]);
      } finally {
        mounted && setLoading(false);
      }
    };

    fetchData();
    setSearchParams({ page });
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => (mounted = false);
  }, [page, category, search, setSearchParams]);

  /* ================= BODY SCROLL LOCK ================= */
  useEffect(() => {
    document.body.style.overflow = isMobileCategoryOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileCategoryOpen]);

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

  const categories = [
    "All",
    "Economy",
    "Polity",
    "Science",
    "Technology",
    "Environment",
    "International",
    "National",
    "Defence",
    "Sports",
  ];

  return (
    <>
      <Helmet>
        <title>NMAI – Current Affairs, MCQs & Daily Quiz for UPSC, SSC</title>
      </Helmet>

      <div className="home-page">
        {isMobileCategoryOpen && (
          <div
            className="sidebar-overlay active"
            onClick={() => setIsMobileCategoryOpen(false)}
          />
        )}

        <div className="home-container">
          <button
            className="mobile-category-toggle"
            onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
          >
            {isMobileCategoryOpen ? <FiX /> : <FiMenu />}
            <span>Categories</span>
          </button>

          <div className="home-layout">
            {/* LEFT SIDEBAR */}
            <aside
              className={`home-sidebar left ${
                isMobileCategoryOpen ? "mobile-open" : ""
              }`}
            >
              <div className="sidebar-header">
                <h3>Categories</h3>
                <button
                  className="sidebar-close"
                  onClick={() => setIsMobileCategoryOpen(false)}
                >
                  <FiX />
                </button>
              </div>

              <ul>
                {categories.map((cat) => (
                  <li
                    key={cat}
                    className={category === cat ? "active" : ""}
                    onClick={() => {
                      setCategory(cat);
                      setPage(1);
                      setIsMobileCategoryOpen(false);
                    }}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </aside>

            {/* MAIN CONTENT */}
            <main className="home-content">
              {/* HERO */}
              <section className="hero-section">
                <div className="hero-content">
                  <h1 className="hero-title">
                    Master Current Affairs for{" "}
                    <span className="gradient-text">Competitive Exams</span>
                  </h1>
                  <p className="hero-subtitle">
                    Daily current affairs, MCQs, and exam-focused content for UPSC, SSC, Banking & more.
                  </p>

                  <div className="hero-buttons">
                    <Link to="/current-affairs" className="btn btn-primary">
                      <FiBookOpen /> Explore Articles
                    </Link>
                    <Link to="/daily-quiz" className="btn btn-outline">
                      <FiTarget /> Take Daily Quiz
                    </Link>
                  </div>
                </div>
              </section>

              {/* LATEST */}
              <section className="section latest-section">
                <h2 className="section-title">Latest Current Affairs</h2>

                {loading && (
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading articles...</p>
                  </div>
                )}

                {!loading && articles.length === 0 && page === 1 && (
                  <div className="empty-state">
                    <p>No articles found. Try changing your filters.</p>
                  </div>
                )}

                {!loading && (
                  <>
                    {[
                      ["Today", today],
                      ["Yesterday", yesterday],
                      ["Earlier", earlier],
                    ].map(
                      ([label, list]) =>
                        list.length > 0 && (
                          <React.Fragment key={label}>
                            <h3 className="group-title">{label}</h3>
                            <div className="articles-grid">
                              {list.map((a) => (
                                <ArticleCard
                                  key={a._id}
                                  article={{
                                    ...a,
                                    dateLabel: getDateLabel(
                                      a.publishDate || a.createdAt
                                    ),
                                  }}
                                />
                              ))}
                            </div>
                          </React.Fragment>
                        )
                    )}

                    <Pagination
                      page={page}
                      totalPages={totalPages}
                      onChange={setPage}
                    />
                  </>
                )}
              </section>

              {/* TRENDING (LAYOUT KEPT) */}
              {trending.length > 0 && (
                <section className="section trending-section">
                  <h2 className="section-title">
                    <FiTrendingUp /> Trending Now
                  </h2>
                </section>
              )}
            </main>

            {/* RIGHT SIDEBAR */}
            <aside className="home-sidebar right">
              <div className="sidebar-search">
                <input
                  type="text"
                  placeholder="Search current affairs..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>

              <div className="sidebar-card">
                <h3>E-Books</h3>
                <ul>
                  <li><Link to="/ebooks/monthly-mcqs">Monthly MCQs</Link></li>
                  <li><Link to="/ebooks/ca-articles-mcqs">Articles + MCQs</Link></li>
                  <li><Link to="/ebooks/yearly-pdf">Yearly PDF</Link></li>
                </ul>
              </div>

              <div className="sidebar-card">
                <h3>Exams</h3>
                <ul>
                  <li><Link to="/exams/upsc">UPSC</Link></li>
                  <li><Link to="/exams/ssc">SSC</Link></li>
                  <li><Link to="/exams/banking">Banking</Link></li>
                  <li><Link to="/exams/railway">Railway</Link></li>
                  <li><Link to="/exams/state-psc">State PSC</Link></li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
