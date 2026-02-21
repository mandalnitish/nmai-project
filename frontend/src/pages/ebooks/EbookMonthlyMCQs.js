import React from "react";
import "./Ebook.css";

export default function EbookMonthlyMCQs() {
  const pdfPath = "/pdfs/NMAI Current Affairs Monthly Current Affairs MCQ.pdf";

  return (
    <div className="page-container">
      <div className="ebook-full">

        {/* ── Hero Header ── */}
        <div className="ebook-header">

          <div className="ebook-badge">
            <span className="ebook-badge-dot" />
            Free E-Book
          </div>

          <h1 className="ebook-title">Current Affairs Monthly MCQs</h1>

          <p className="ebook-desc">
            Comprehensive monthly MCQs covering every major topic — curated for
            UPSC, SSC, Banking &amp; State PSC aspirants.
          </p>

          <div className="ebook-stats">
            <span className="ebook-stat"><span className="ebook-stat-icon">📄</span> 18 Pages</span>
            <span className="ebook-stat"><span className="ebook-stat-icon">🗓️</span> January 2026</span>
            <span className="ebook-stat"><span className="ebook-stat-icon">🎯</span> UPSC · SSC · Banking</span>
            <span className="ebook-stat"><span className="ebook-stat-icon">⚡</span> Free Download</span>
          </div>

          <div className="ebook-actions">
            <a
              href={pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="ebook-btn primary"
            >
              📖 View PDF
            </a>
            <a href={pdfPath} download className="ebook-btn outline">
              ⬇️ Download PDF
            </a>
            <button
              className="ebook-btn outline"
              onClick={() => window.open(pdfPath)}
            >
              ⛶ Fullscreen
            </button>
          </div>

        </div>

        {/* ── Full-Width PDF Viewer ── */}
        <div className="ebook-viewer-full">
          <iframe
            src={pdfPath}
            className="ebook-frame"
            title="Monthly Current Affairs MCQs"
          />
        </div>

      </div>
    </div>
  );
}