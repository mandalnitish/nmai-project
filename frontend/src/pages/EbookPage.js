import React from "react";
import { useParams } from "react-router-dom";

const ebookTitles = {
  "monthly-mcqs": "Current Affairs Monthly MCQs",
  "ca-articles-mcqs": "CA Articles + MCQs",
  "yearly-pdf": "Yearly Current Affairs PDF",
};

export default function EbookPage() {
  const { type } = useParams();
  const title = ebookTitles[type] || "E-Book";

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{title}</h1>
      <p>
        Download and explore {title} for competitive exam preparation.
      </p>

      <button style={{ marginTop: "1rem" }}>
        Download PDF
      </button>
    </div>
  );
}
