import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { mcqsAPI } from "../services/api";
import MCQCard from "../components/MCQCard";
import { toast } from "react-toastify";
import { FiTarget, FiAward, FiRefreshCw } from "react-icons/fi";
import "./DailyQuiz.css";

const DailyQuiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  /* ================= FETCH QUIZ ================= */
  const {
    data: quizData,
    isLoading,
    isError,
  } = useQuery(
    ["dailyQuiz"],
    mcqsAPI.getDailyQuiz,
    {
      enabled: quizStarted,
      staleTime: 5 * 60 * 1000,
    }
  );

  // ✅ NORMALIZED SAFE QUESTIONS ARRAY
  const questions = quizData?.data ?? [];

  /* ================= SUBMIT QUIZ ================= */
  const submitMutation = useMutation(
    (payload) => mcqsAPI.submit(payload),
    {
      onSuccess: (response) => {
        setResults(response.data);
        setShowResults(true);
        toast.success(`Quiz completed! Score: ${response.data.score}%`);
      },
      onError: () => {
        toast.error("Failed to submit quiz");
      },
    }
  );

  /* ================= HANDLERS ================= */
  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setResults(null);
  };

  const handleAnswer = (mcqId, selectedAnswer) => {
    const updated = [...answers];
    updated[currentQuestion] = { mcqId, selectedAnswer };
    setAnswers(updated);
  };

  const handleNext = () => {
    if (!answers[currentQuestion]) {
      toast.error("Please select an answer");
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((q) => q - 1);
    }
  };

  const handleSubmit = () => {
    if (answers.length < questions.length) {
      toast.error("Please answer all questions");
      return;
    }
    submitMutation.mutate({ answers });
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setResults(null);
  };

  /* ================= START SCREEN ================= */
  if (!quizStarted) {
    return (
      <div className="daily-quiz-page">
        <div className="quiz-start-screen">
          <div className="start-card">
            <FiTarget className="start-icon" />
            <h1>Daily Quiz Challenge</h1>
            <p>Test your knowledge with carefully selected questions</p>

            <div className="quiz-info">
              <div className="info-item">
                <strong>10</strong>
                <span>Questions</span>
              </div>
              <div className="info-item">
                <strong>Mixed</strong>
                <span>Categories</span>
              </div>
              <div className="info-item">
                <strong>10 mins</strong>
                <span>Suggested</span>
              </div>
            </div>

            <button className="btn btn-primary btn-lg" onClick={startQuiz}>
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Preparing your quiz...</p>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (isError || questions.length === 0) {
    return (
      <div className="daily-quiz-page">
        <p>No quiz available today. Please check back later.</p>
      </div>
    );
  }

  /* ================= RESULTS ================= */
  if (showResults && results) {
    return (
      <div className="daily-quiz-page">
        <div className="quiz-results-screen">
          <div className="results-card">
            <FiAward className="results-icon" />
            <h1>Quiz Completed!</h1>

            <div className="score-circle">
              <div className="score-value">{results.score}%</div>
              <div className="score-label">Your Score</div>
            </div>

            <div className="results-stats">
              <div className="stat-box correct">
                <div className="stat-number">{results.correctAnswers}</div>
                <div className="stat-label">Correct</div>
              </div>
              <div className="stat-box incorrect">
                <div className="stat-number">{results.incorrectAnswers}</div>
                <div className="stat-label">Incorrect</div>
              </div>
              <div className="stat-box total">
                <div className="stat-number">{results.totalQuestions}</div>
                <div className="stat-label">Total</div>
              </div>
            </div>

            <div className="detailed-results">
              <h3>Detailed Results</h3>
              {results.results.map((result, index) => (
                <MCQCard
                  key={index}
                  mcq={{
                    ...result,
                    options: questions[index]?.options,
                    category: questions[index]?.category,
                  }}
                  showAnswer
                  selectedAnswer={result.selectedAnswer}
                />
              ))}
            </div>

            <button className="btn btn-primary btn-lg" onClick={restartQuiz}>
              <FiRefreshCw /> Take Another Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================= QUIZ UI ================= */
  const currentMCQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="daily-quiz-page">
      <div className="quiz-container">
        <div className="quiz-header">
          <div className="quiz-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="progress-text">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
        </div>

        <MCQCard
          mcq={currentMCQ}
          onAnswer={handleAnswer}
          selectedAnswer={answers[currentQuestion]?.selectedAnswer}
        />

        <div className="quiz-navigation">
          <button
            className="btn btn-secondary"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>

          <div className="answer-indicators">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`indicator ${
                  answers[index] ? "answered" : ""
                } ${index === currentQuestion ? "active" : ""}`}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </div>
            ))}
          </div>

          {currentQuestion < questions.length - 1 ? (
            <button className="btn btn-primary" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={submitMutation.isLoading}
            >
              {submitMutation.isLoading ? "Submitting..." : "Submit Quiz"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyQuiz;
