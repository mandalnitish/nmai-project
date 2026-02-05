import React from "react";
import { Helmet } from "react-helmet";
import "./StaticPages.css";

export default function AboutUs() {
  return (
    <div className="static-page">
      <Helmet>
        <title>About Us | NMAI</title>
        <meta
          name="description"
          content="Learn about NMAI – National & Major Affairs India, a platform for current affairs, MCQs, and exam-focused preparation."
        />
      </Helmet>

      <div className="static-card">
        <h1>About NMAI</h1>

        <p className="intro">
          <strong>NMAI (National & Major Affairs India)</strong> is an
          exam-focused learning platform built for aspirants of UPSC,
          SSC, Banking, Railway, and State PSC examinations.
        </p>

        <p>
          We provide <strong>high-quality current affairs</strong>,
          category-wise articles, daily MCQs, and quizzes designed
          specifically for competitive exams.
        </p>

        <p>
          Our mission is to simplify preparation by delivering
          <strong> accurate, structured, and exam-relevant content</strong>
          — saving students time and improving retention.
        </p>

        <div className="highlight-box">
          <h3>Why NMAI?</h3>
          <ul>
            <li>✔ Daily updated current affairs</li>
            <li>✔ Exam-oriented MCQs & quizzes</li>
            <li>✔ Category-wise & date-wise coverage</li>
            <li>✔ Clean, distraction-free learning</li>
          </ul>
        </div>

        <p className="closing">
          NMAI is built by educators and technologists with a single goal:
          <strong> help aspirants prepare smarter, not harder.</strong>
        </p>
      </div>
    </div>
  );
}
