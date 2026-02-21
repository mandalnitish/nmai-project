import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import exams from "../../data/exams";
import "./ExamPage.css";

/* Feature cards shown below the hero for each exam */
const examFeatures = [
  {
    icon: "📰",
    title: "Daily Current Affairs",
    desc: "Stay updated with handpicked news articles relevant to your exam, published every day.",
    link: "/current-affairs",
    label: "Browse Articles →",
  },
  {
    icon: "🧠",
    title: "MCQ Practice",
    desc: "Topic-wise and date-wise multiple choice questions with detailed explanations.",
    link: "/mcq-practice",
    label: "Start Practising →",
  },
  {
    icon: "📝",
    title: "Daily Quiz",
    desc: "Take a fresh 10-question quiz every day to test your current affairs knowledge.",
    link: "/daily-quiz",
    label: "Take Today's Quiz →",
  },
  {
    icon: "📚",
    title: "Monthly MCQ E-Book",
    desc: "Download free monthly MCQ PDFs compiled from all current affairs of the month.",
    link: "/ebooks/monthly-mcqs",
    label: "Download Free PDF →",
  },
  {
    icon: "📄",
    title: "Yearly PDF",
    desc: "Complete annual current affairs PDF — perfect for last-minute revision.",
    link: "/ebooks/yearly-pdf",
    label: "Get Yearly PDF →",
  },
  {
    icon: "🗂️",
    title: "Topic Categories",
    desc: "Browse current affairs by category — Polity, Economy, Science, Environment & more.",
    link: "/current-affairs",
    label: "Explore Topics →",
  },
];

export default function ExamPage() {
  const { examSlug } = useParams();
  const exam = exams.find((e) => e.slug === examSlug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [examSlug]);

  if (!exam) {
    return (
      <div className="page-container">
        <div className="exam-full">
          <div className="exam-header">
            <div className="exam-badge"><span className="exam-badge-dot" /> Exam Hub</div>
            <h1 className="exam-title">Exam Not Found</h1>
            <p className="exam-desc">
              The exam page you're looking for doesn't exist. Head back home and explore our resources.
            </p>
            <div className="exam-actions">
              <Link to="/" className="btn-modern btn-primary-modern">🏠 Go Home</Link>
              <Link to="/current-affairs" className="btn-modern btn-outline-modern">📰 Current Affairs</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="exam-full">

        {/* ── Hero Header ── */}
        <div className="exam-header">

          <div className="exam-badge">
            <span className="exam-badge-dot" />
            Exam Preparation Hub
          </div>

          <h1 className="exam-title">{exam.title} Preparation</h1>

          <p className="exam-desc">{exam.description}</p>

          <div className="exam-stats">
            <span className="exam-stat"><span className="exam-stat-icon">📰</span> Daily Current Affairs</span>
            <span className="exam-stat"><span className="exam-stat-icon">🧠</span> Topic-wise MCQs</span>
            <span className="exam-stat"><span className="exam-stat-icon">📄</span> Free PDF Downloads</span>
            <span className="exam-stat"><span className="exam-stat-icon">⚡</span> 100% Free</span>
          </div>

          <div className="exam-actions">
            <Link to="/current-affairs" className="btn-modern btn-primary-modern">
              📰 Current Affairs
            </Link>
            <Link to="/mcq-practice" className="btn-modern btn-outline-modern">
              🧠 Practice MCQs
            </Link>
            <Link to="/daily-quiz" className="btn-modern btn-outline-modern">
              📝 Daily Quiz
            </Link>
          </div>

        </div>

        {/* ── Feature Cards ── */}
        <div className="exam-body">
          <h2 className="exam-body-title">📚 Resources for {exam.title}</h2>
          <div className="exam-features">
            {examFeatures.map((f) => (
              <Link key={f.title} to={f.link} className="exam-feature-card">
                <span className="exam-feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span className="exam-feature-link">{f.label}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}