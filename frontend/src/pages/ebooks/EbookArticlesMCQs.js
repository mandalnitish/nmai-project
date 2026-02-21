import React, { useEffect } from "react";
import "./Ebook.css";

export default function EbookArticlesMCQs() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-container">
      <div className="ebook-full">

        {/* ── Hero Header ── */}
        <div className="ebook-header">

          <div className="ebook-badge">
            <span className="ebook-badge-dot" />
            Coming Soon
          </div>

          <h1 className="ebook-title">Current Affairs Articles + MCQs</h1>

          <p className="ebook-desc">
            Integrated current affairs articles paired with exam-focused MCQs —
            the smartest way to study for UPSC, SSC, Banking, Railway &amp; State PSC exams.
          </p>

          <div className="ebook-stats">
            <span className="ebook-stat"><span className="ebook-stat-icon">📝</span> Articles + MCQs</span>
            <span className="ebook-stat"><span className="ebook-stat-icon">🎯</span> All Competitive Exams</span>
            <span className="ebook-stat"><span className="ebook-stat-icon">🔔</span> Notify Me on Release</span>
          </div>

          <div className="ebook-actions">
            <button className="ebook-btn primary" disabled>
              📖 View PDF
            </button>
            <button className="ebook-btn outline" disabled>
              ⬇️ Download PDF
            </button>
          </div>

        </div>

        {/* ── Coming Soon Body ── */}
        <div className="ebook-coming-wrapper">
          <div className="ebook-coming">
            <span className="ebook-coming-icon">🚧</span>
            <h3>Content Coming Soon</h3>
            <p>
              We're working hard on this e-book. Check back soon or explore our
              other free resources in the meantime.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}