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
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>Prev</button>
      <span>Page {page} of {totalPages}</span>
      <button disabled={page === totalPages} onClick={() => onChange(page + 1)}>Next</button>
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

        // ✅ CORRECT RESPONSE MAPPING
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
    setSearchParams({ page });
    return () => (mounted = false);
  }, [page, category, search, setSearchParams]);

  const today = articles.filter(a => isToday(a.publishDate || a.createdAt));
  const yesterday = articles.filter(a => isYesterday(a.publishDate || a.createdAt));
  const earlier = articles.filter(
    a => !isToday(a.publishDate || a.createdAt) && !isYesterday(a.publishDate || a.createdAt)
  );

  return (
    <div className="gk-layout">
      {/* LEFT SIDEBAR */}
      <aside className="gk-sidebar left">
        <h3>Categories</h3>
        <ul>
          {["All","Economy","Polity","Science","Technology","Environment","International","National","Defence"].map(cat => (
            <li key={cat} className={category === cat ? "active" : ""}
              onClick={() => { setCategory(cat); setPage(1); }}>
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* MAIN */}
      <main className="gk-content">
        <section className="hero-section">
          <h1>Master Current Affairs for <span className="gradient-text">Competitive Exams</span></h1>
          <p>Daily current affairs, MCQs, and exam-focused content.</p>
          <div className="hero-buttons">
            <Link to="/current-affairs" className="btn btn-primary"><FiBookOpen /> Explore</Link>
            <Link to="/daily-quiz" className="btn btn-outline"><FiTarget /> Daily Quiz</Link>
          </div>
        </section>

        <section className="section">
          <h2>Latest Current Affairs</h2>

          {loading && <p>Loading articles...</p>}
          {!loading && articles.length === 0 && <div className="empty-state">No articles found.</div>}

          {[["Today", today], ["Yesterday", yesterday], ["Earlier", earlier]].map(
            ([label, list]) =>
              list.length > 0 && (
                <React.Fragment key={label}>
                  <h3 className="group-title">{label}</h3>
                  <div className="articles-grid">
                    {list.map(a => (
                      <ArticleCard key={a._id} article={{ ...a, dateLabel: getDateLabel(a.publishDate || a.createdAt) }} />
                    ))}
                  </div>
                </React.Fragment>
              )
          )}

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </section>

        {trending.length > 0 && (
          <section className="section">
            <h2><FiTrendingUp /> Trending</h2>
            <div className="trending-grid">
              {trending.map((a, i) => (
                <Link key={a._id} to={`/article/${a.slug}`} className="trending-item">
                  <span>#{i + 1}</span>
                  <h4>{a.title}</h4>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* RIGHT SIDEBAR */}
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
