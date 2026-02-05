import React from "react";
import { useParams, Link } from "react-router-dom";
import exams from "../../data/exams";
import "./ExamPage.css";

export default function ExamPage() {
  const { examSlug } = useParams();

  const exam = exams.find((e) => e.slug === examSlug);

  if (!exam) {
    return (
      <div className="page-container">
        <h2>Exam Not Found</h2>
        <Link to="/">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="page-container exam-page">
      <h1>{exam.title}</h1>
      <p className="exam-desc">{exam.description}</p>

      <div className="exam-actions">
        <Link to="/current-affairs" className="btn btn-primary">
          Current Affairs
        </Link>

        <Link to="/mcq-practice" className="btn btn-outline">
          Practice MCQs
        </Link>

        <Link to="/daily-quiz" className="btn btn-outline">
          Daily Quiz
        </Link>
      </div>
    </div>
  );
}
