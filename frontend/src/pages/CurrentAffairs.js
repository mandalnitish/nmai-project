import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { articlesAPI } from "../services/api";
import ArticleCard from "../components/ArticleCard";
import SearchBar from "../components/SearchBar";
import { FiFilter } from "react-icons/fi";
import "./CurrentAffairs.css";

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
  "state-psc": "State PSC",
};

const CurrentAffairs = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type"); // daily | monthly | upsc | ssc

  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [examType, setExamType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  /* ================= APPLY SECONDARY BAR FILTER ================= */
  useEffect(() => {
    if (!type) return;

    // Exam-based filter
    if (EXAM_MAP[type]) {
      setExamType(EXAM_MAP[type]);
    } else {
      setExamType("");
    }

    // Reset pagination when tab changes
    setPage(1);
  }, [type]);

  /* ================= QUERY ================= */
  const { data, isLoading, error } = useQuery(
    ["articles", page, category, examType, searchTerm, type],
    () =>
      articlesAPI.getAll({
        page,
        limit: 9,
        category: category === "All" ? "" : category,
        examRelevance: examType,
        search: searchTerm,
        type, // optional backend usage (daily/monthly)
      }),
    { keepPreviousData: true }
  );

  return (
    <div className="current-affairs-page">
      {/* ================= HERO ================= */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Daily Current Affairs</h1>
          <p className="page-subtitle">
            Smart updates for UPSC, SSC, Banking & State PSC
          </p>
        </div>
      </div>

      <div className="container">
        <SearchBar onSearch={(t) => setSearchTerm(t)} />

        <div className="ca-layout">
          {/* ================= SIDEBAR ================= */}
          <aside className="ca-sidebar">
            <div className="glass">
              <h3 className="sidebar-title">Filter by Category</h3>
              <ul className="category-list">
                {CATEGORIES.map((cat) => (
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
            </div>

            <div className="glass exam-filter">
              <label>
                <FiFilter /> Filter by Exam
              </label>
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
            {isLoading ? (
              <div className="loading-container">
                <p>Loading articles...</p>
              </div>
            ) : error ? (
              <div className="error-message">
                Failed to load articles
              </div>
            ) : data?.data?.length ? (
              <>
                <div className="articles-grid">
                  {data.data.map((article) => (
                    <ArticleCard key={article._id} article={article} />
                  ))}
                </div>

                {data.pagination?.totalPages > 1 && (
                  <div className="pagination">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                      className="pagination-btn"
                    >
                      Previous
                    </button>

                    <span className="pagination-info">
                      Page {page} of {data.pagination.totalPages}
                    </span>

                    <button
                      disabled={page === data.pagination.totalPages}
                      onClick={() => setPage((p) => p + 1)}
                      className="pagination-btn"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="empty-state">
                <h3>No articles found</h3>
                <p>Try another filter or keyword</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CurrentAffairs;
