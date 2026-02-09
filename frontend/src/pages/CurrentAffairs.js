import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { FiFilter, FiX } from "react-icons/fi";

import { articlesAPI } from "../services/api";
import ArticleCardHorizontal from "../components/ArticleCardHorizontal";
import SearchBar from "../components/SearchBar";

import "./CurrentAffairs.css";

/* ================= CONSTANTS ================= */
const CATEGORIES = [
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
  "Awards",
];

const EXAM_MAP = {
  upsc: "UPSC",
  ssc: "SSC",
  banking: "Banking",
  railway: "Railway",
  "state-psc": "State PSC",
};

/* ================= COMPONENT ================= */
const CurrentAffairs = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [examType, setExamType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /* ================= URL → EXAM FILTER ================= */
  useEffect(() => {
    if (EXAM_MAP[type]) {
      setExamType(EXAM_MAP[type]);
    } else {
      setExamType("");
    }
    setPage(1);
  }, [type]);

  /* ================= LOCK BODY SCROLL (MOBILE) ================= */
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  /* ================= AUTO CLOSE SIDEBAR ON DESKTOP ================= */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= FETCH ARTICLES ================= */
  const queryKey = [
    "articles",
    page,
    category,
    examType,
    searchTerm,
  ];

  const { data, isLoading, error } = useQuery(
    queryKey,
    () =>
      articlesAPI.getAll({
        page,
        limit: 9,
        category: category === "All" ? "" : category,
        examRelevance: examType,
        search: searchTerm,
      }),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000,
    }
  );

  const articles = data?.articles || [];
  const pagination = data?.pagination;

  /* ================= UI ================= */
  return (
    <div className="current-affairs-page">
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay active"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="ca-container">
        {/* MOBILE FILTER BUTTON */}
        <button
          className="mobile-filter-toggle"
          onClick={() => setIsSidebarOpen((v) => !v)}
          aria-label="Toggle filters"
        >
          {isSidebarOpen ? <FiX /> : <FiFilter />}
          <span>Filters</span>
        </button>

        {/* SEARCH */}
        <div className="ca-search-wrapper">
          <SearchBar
            onSearch={(term) => {
              setSearchTerm(term);
              setPage(1);
            }}
          />
        </div>

        <div className="ca-layout">
          {/* ================= SIDEBAR ================= */}
          <aside
            className={`ca-sidebar ${
              isSidebarOpen ? "mobile-open" : ""
            }`}
          >
            <div className="sidebar-header">
              <h3 className="sidebar-title">
                <FiFilter /> Filters
              </h3>
              <button
                className="sidebar-close"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close filters"
              >
                <FiX />
              </button>
            </div>

            {/* CATEGORIES */}
            <div className="filter-section">
              <h4>Categories</h4>
              <ul className="category-list">
                {CATEGORIES.map((cat) => (
                  <li
                    key={cat}
                    className={category === cat ? "active" : ""}
                    onClick={() => {
                      setCategory(cat);
                      setPage(1);
                      setIsSidebarOpen(false);
                    }}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            {/* EXAM FILTER */}
            <div className="filter-section exam-filter">
              <h4>Exam Type</h4>
              <select
                value={examType}
                onChange={(e) => {
                  setExamType(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Exams</option>
                <option value="UPSC">UPSC</option>
                <option value="SSC">SSC</option>
                <option value="Banking">Banking</option>
                <option value="Railway">Railway</option>
                <option value="State PSC">State PSC</option>
              </select>
            </div>
          </aside>

          {/* ================= CONTENT ================= */}
          <section className="ca-content">
            {/* ACTIVE FILTERS */}
            {(category !== "All" || examType) && (
              <div className="active-filters">
                <span className="filter-label">Active Filters:</span>

                {category !== "All" && (
                  <span className="filter-tag">
                    {category}
                    <button onClick={() => setCategory("All")}>×</button>
                  </span>
                )}

                {examType && (
                  <span className="filter-tag">
                    {examType}
                    <button onClick={() => setExamType("")}>×</button>
                  </span>
                )}
              </div>
            )}

            {/* STATES */}
            {isLoading ? (
              <div className="loading-container">
                <div className="spinner" />
                <p>Loading current affairs…</p>
              </div>
            ) : error ? (
              <div className="error-message">
                <p>Failed to load articles. Please try again.</p>
              </div>
            ) : articles.length ? (
              <>
                <div className="articles-grid">
                  {articles.map((article) => (
                    <ArticleCardHorizontal
                      key={article._id}
                      article={article}
                    />
                  ))}
                </div>

                {/* PAGINATION */}
                {pagination?.totalPages > 1 && (
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      disabled={page === 1}
                      onClick={() => {
                        setPage((p) => p - 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Previous
                    </button>

                    <span className="pagination-info">
                      Page {page} of {pagination.totalPages}
                    </span>

                    <button
                      className="pagination-btn"
                      disabled={page === pagination.totalPages}
                      onClick={() => {
                        setPage((p) => p + 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <h3>No articles found</h3>
                <p>Try changing your filters or search term</p>
                <button
                  className="reset-btn"
                  onClick={() => {
                    setCategory("All");
                    setExamType("");
                    setSearchTerm("");
                    setPage(1);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CurrentAffairs;
