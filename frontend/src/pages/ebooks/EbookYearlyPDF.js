import React from "react";

export default function EbookYearlyPDF() {
  const pdfPath = "/pdfs/Annual Current Affairs 2025 NMAI.pdf";

  return (
    <div className="page-container">
      <h1>Yearly Current Affairs PDF</h1>
      <p>Download yearly compiled current affairs PDFs.</p>

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
          title="Yearly Current Affairs PDF"
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px"
          }}
        />
      </div>
    </div>
  );
}
