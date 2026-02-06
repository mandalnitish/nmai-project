import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { FiFilter } from "react-icons/fi";

import { articlesAPI } from "../services/api";
import ArticleCard from "../components/ArticleCard";
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

  /* ================= URL → EXAM FILTER ================= */
  useEffect(() => {
    if (EXAM_MAP[type]) {
      setExamType(EXAM_MAP[type]);
    } else {
      setExamType("");
    }
    setPage(1);
  }, [type]);

  /* ================= FETCH ARTICLES ================= */
  const { data, isLoading, error } = useQuery(
    ["articles", page, category, examType, searchTerm],
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
    }
  );

  const articles = data?.articles || [];
  const pagination = data?.pagination;

  /* ================= UI ================= */
  return (
    <div className="current-affairs-page">
      <div className="container ca-container">
        {/* SEARCH */}
        <SearchBar
          onSearch={(term) => {
            setSearchTerm(term);
            setPage(1);
          }}
        />

        <div className="ca-layout">
          {/* ================= SIDEBAR ================= */}
          <aside className="ca-sidebar">
            <div className="glass">
              <h3 className="sidebar-title">Categories</h3>
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
                <p>Loading current affairs…</p>
              </div>
            ) : error ? (
              <div className="error-message">
                Failed to load articles. Please try again.
              </div>
            ) : articles.length > 0 ? (
              <>
                <div className="articles-grid">
                  {articles.map((article) => (
                    <ArticleCard
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
                      onClick={() => setPage((p) => p - 1)}
                    >
                      Previous
                    </button>

                    <span className="pagination-info">
                      Page {page} of {pagination.totalPages}
                    </span>

                    <button
                      className="pagination-btn"
                      disabled={page === pagination.totalPages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="empty-state">
                <h3>No articles found</h3>
                <p>Try changing category, exam, or search term</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CurrentAffairs;
