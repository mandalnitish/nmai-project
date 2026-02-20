import React from "react";

export default function EbookMonthlyMCQs() {
  const pdfPath = "/pdfs/NMAI Current Affairs Monthly Current Affairs MCQ.pdf";

  return (
    <div className="page-container">
      <h1>Current Affairs Monthly MCQs</h1>
      <p>Monthly MCQs for UPSC, SSC, Banking & State PSC exams.</p>

      {/* View Button */}
      <a
        href={pdfPath}
        target="_blank"
        rel="noopener noreferrer"
        className="download-btn"
      >
        View PDF
      </a>

      {/* Download Button */}
      <a
        href={pdfPath}
        download
        className="download-btn"
        style={{ marginLeft: "10px" }}
      >
        Download PDF
      </a>

      {/* Embedded PDF Viewer */}
      <div style={{ marginTop: "20px" }}>
        <iframe
          src={pdfPath}
          width="100%"
          height="600px"
          title="Monthly Current Affairs MCQs PDF"
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px"
          }}
        />
      </div>
    </div>
  );
}
