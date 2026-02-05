import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { mcqsAPI } from '../services/api';
import MCQCard from '../components/MCQCard';
import { FiFilter, FiRefreshCw } from 'react-icons/fi';
import './MCQPractice.css';

const MCQPractice = () => {
  const [category, setCategory] = useState('');
  const [examType, setExamType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [page, setPage] = useState(1);
  const [answers, setAnswers] = useState({});

  const { data, isLoading, refetch } = useQuery(
    ['mcqs', category, examType, difficulty, page],
    () =>
      mcqsAPI.getAll({
        page,
        limit: 10,
        category,
        examType,
        difficulty
      }),
    {
      keepPreviousData: true
    }
  );

  const handleAnswer = (mcqId, selectedAnswer) => {
    setAnswers(prev => ({
      ...prev,
      [mcqId]: selectedAnswer
    }));
  };

  const handleReset = () => {
    setAnswers({});
    setCategory('');
    setExamType('');
    setDifficulty('');
    setPage(1);
    refetch();
  };

  return (
    <div className="mcq-practice-page">
      <div className="container">

        {/* FILTERS */}
        <div className="filters-card">
          <div className="filters-header">
            <h3><FiFilter /> Filter Questions</h3>
            <button className="reset-btn" onClick={handleReset}>
              <FiRefreshCw /> Reset
            </button>
          </div>

          <div className="filters-grid">
            <div className="filter-group">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                <option value="National Affairs">National Affairs</option>
                <option value="International Relations">International Relations</option>
                <option value="Economy & Business">Economy & Business</option>
                <option value="Science & Technology">Science & Technology</option>
                <option value="Environment & Ecology">Environment & Ecology</option>
                <option value="Polity & Governance">Polity & Governance</option>
                <option value="Sports">Sports</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="examType">Exam Type:</label>
              <select
                id="examType"
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="filter-select"
              >
                <option value="">All Exams</option>
                <option value="UPSC">UPSC</option>
                <option value="SSC">SSC</option>
                <option value="Banking">Banking</option>
                <option value="Railway">Railway</option>
                <option value="State PSC">State PSC</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="difficulty">Difficulty:</label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="filter-select"
              >
                <option value="">All Levels</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* MCQs LIST */}
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading questions...</p>
          </div>
        ) : data?.data?.length > 0 ? (
          <>
            <div className="mcqs-list">
              {data.data.map((mcq, index) => (
                <div key={mcq._id} className="mcq-item">
                  <div className="mcq-number">
                    Question {(page - 1) * 10 + index + 1}
                  </div>
                  <MCQCard
                    mcq={mcq}
                    onAnswer={handleAnswer}
                    selectedAnswer={answers[mcq._id]}
                  />
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            {data?.pagination?.totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </button>

                <div className="pagination-info">
                  Page {page} of {data.pagination.totalPages}
                </div>

                <button
                  className="pagination-btn"
                  onClick={() =>
                    setPage(p => Math.min(data.pagination.totalPages, p + 1))
                  }
                  disabled={page === data.pagination.totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <h3>No questions found</h3>
            <p>Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MCQPractice;
