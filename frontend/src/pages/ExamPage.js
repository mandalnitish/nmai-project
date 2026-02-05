import React from "react";
import { useParams } from "react-router-dom";

const examTitles = {
  upsc: "UPSC",
  ssc: "SSC",
  banking: "Banking",
  railway: "Railway",
  "state-psc": "State PSC",
  gpsc: "GPSC",
  bpsc: "BPSC",
  mppsc: "MPPSC",
};

export default function ExamPage() {
  const { examSlug } = useParams();
  const title = examTitles[examSlug] || "Exam";

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{title} Preparation</h1>
      <p>
        Latest current affairs, MCQs, and study material for {title}.
      </p>

      <ul>
        <li>Daily Current Affairs</li>
        <li>Previous Year MCQs</li>
        <li>Practice Tests</li>
        <li>PDF Notes</li>
      </ul>
    </div>
  );
}
