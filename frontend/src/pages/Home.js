import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { articlesAPI } from "../services/api";
import ArticleCard from "../components/ArticleCard";
import ArticleSkeleton from "../components/ArticleSkeleton";
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

  /* ================= STATE ================= */
  const [articles, setArticles] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Get page from URL, default to 1
  const page = Number(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(1);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);


  /* ======================================================
     LISTEN FOR LOGO CLICK RESET EVENT
  ====================================================== */

  useEffect(() => {

    const handleHomeReset = () => {

      setCategory("All");
      setSearch("");
      setSearchParams({ page: 1 });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    };

    window.addEventListener("homeReset", handleHomeReset);
    return () => {
      window.removeEventListener("homeReset", handleHomeReset);
    };

  }, [setSearchParams]);

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
        setTrending(trendingRes.articles || []);

      } catch (err) {

        console.error("Home fetch error:", err);
        setArticles([]);
        setTrending([]);

      } finally {

        if (mounted) setLoading(false);

      }
    };

    fetchData();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return () => {
      mounted = false;
    };

  }, [page, category, search]);


  /* ================= BODY SCROLL LOCK ================= */

  useEffect(() => {
    document.body.style.overflow =
      isMobileCategoryOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileCategoryOpen]);


  /* ================= HANDLERS ================= */

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setSearchParams({ page: 1 });
    setIsMobileCategoryOpen(false);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setSearchParams({ page: 1 });
  };


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
    "National",
    "International",
    "Economy",
    "Polity",
    "Science",
    "Technology",
    "Environment",
    "Defence",
    "Sports",
  ];


  /* ================= JSX ================= */

  return (
    <>
      <Helmet>
        <title>
          NMAI – Current Affairs, MCQs & Daily Quiz for UPSC, SSC
        </title>
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
            onClick={() =>
              setIsMobileCategoryOpen(!isMobileCategoryOpen)
            }
          >
            {isMobileCategoryOpen ? <FiX /> : <FiMenu />}
            <span>Categories</span>
          </button>
          <div className="home-layout">

            {/* ================= LEFT SIDEBAR ================= */}
            <aside
              className={`home-sidebar left ${
                isMobileCategoryOpen ? "mobile-open" : ""
              }`}
            >
              <div className="sidebar-header">
                <h3>Categories</h3>
                <button
                  className="sidebar-close"
                  onClick={() =>
                    setIsMobileCategoryOpen(false)
                  }
                >
                  <FiX />
                </button>
              </div>
              <ul>
                {categories.map((cat) => (
                  <li
                    key={cat}
                    className={category === cat ? "active" : ""}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </aside>

            {/* ================= MAIN CONTENT ================= */}
            <main className="home-content">

              {/* ================= LATEST ================= */}
              <section className="section latest-section">
                <h2 className="section-title">
                  Latest Current Affairs
                </h2>
                {loading && (
                  <div className="articles-grid">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <ArticleSkeleton key={i} />
                    ))}
                  </div>
                )}
                {!loading && articles.length === 0 && page === 1 && (

                  <div className="empty-state">
                    <p>
                      No articles found. Try changing your filters.
                    </p>
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
                            <h3 className="group-title">
                              {label}
                            </h3>
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
                                  layout="horizontal"
                                />
                              ))}
                            </div>
                          </React.Fragment>
                        )
                    )}

                    <Pagination
                      page={page}
                      totalPages={totalPages}
                      onChange={handlePageChange}
                    />
                  </>
                )}
              </section>
              {/* ================= TRENDING ================= */}
              {trending.length > 0 && (
                <section className="section trending-section">
                  <h2 className="section-title">
                    <FiTrendingUp /> Trending Now
                  </h2>
                  <div className="trending-grid">
                    {trending.map((a, i) => (
                      <Link
                        key={a._id}
                        to={`/article/${a.slug}`}
                        className="trending-item"
                      >
                        <span className="trending-number">
                          #{i + 1}
                        </span>
                        <div className="trending-content">
                          <h4>{a.title}</h4>
                          <div className="trending-meta">
                            <span>
                              {formatDate(a.publishDate)}
                            </span>
                            <span>{a.category}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </main>

            {/* ================= RIGHT SIDEBAR ================= */}
            <aside className="home-sidebar right">
              <div className="sidebar-search">
                <input
                  type="text"
                  placeholder="Search current affairs..."
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
              <div className="sidebar-card">
                <h3>E-Books</h3>
                <ul>
                  <li>
                    <Link to="/ebooks/monthly-mcqs">
                      Monthly MCQs
                    </Link>
                  </li>
                  <li>
                    <Link to="/ebooks/ca-articles-mcqs">
                      Articles + MCQs
                    </Link>
                  </li>
                  <li>
                    <Link to="/ebooks/yearly-pdf">
                      Yearly PDF
                    </Link>
                  </li>
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