import React from "react";
import "./Ebook.css";

export default function EbookYearlyPDF() {
  const pdfPath = "/pdfs/Annual Current Affairs 2025 NMAI.pdf";

  return (
    <div className="page-container">
      <div className="ebook-full">

        {/* ── Hero Header ── */}
        <div className="ebook-header">

          <div className="ebook-badge">
            <span className="ebook-badge-dot" />
            Annual Edition
          </div>

          <h1 className="ebook-title">Yearly Current Affairs PDF — 2025</h1>

          <p className="ebook-desc">
            Complete year-round current affairs compilation for 2025 — the
            ultimate revision resource for UPSC, SSC, Banking, Railway &amp;
            State PSC exams.
          </p>

          <div className="ebook-stats">
            <span className="ebook-stat"><span className="ebook-stat-icon">📚</span> Full Year Coverage</span>
            <span className="ebook-stat"><span className="ebook-stat-icon">🗓️</span> Jan – Dec 2025</span>
            <span className="ebook-stat"><span className="ebook-stat-icon">🎯</span> All Competitive Exams</span>
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
            title="Yearly Current Affairs PDF"
            loading="lazy"
          />
        </div>

      </div>
    </div>
  );
}