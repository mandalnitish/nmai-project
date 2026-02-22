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
          content="About NMAI – An exam-focused current affairs platform providing structured analysis and MCQs for competitive examinations."
        />
      </Helmet>

      <div className="static-card">
        <h1>About NMAI</h1>

        <p className="intro">
          <strong>NMAI (National & Major Affairs Of India)</strong> is an
          exam-oriented digital platform dedicated to providing structured
          current affairs and analytical content for competitive examinations
          such as UPSC, SSC, Banking, Railway, and State PSC.
        </p>

        <p>
          Our content is carefully curated with a focus on clarity,
          background context, and exam relevance. Each article is designed to
          connect current developments with static syllabus components,
          enabling better conceptual understanding and retention.
        </p>

        <h3>Our Editorial Approach</h3>
        <ul>
          <li>Topic selection based on national relevance and exam trends</li>
          <li>Background + contextual explanation</li>
          <li>Static GK linkage wherever applicable</li>
          <li>MCQs for self-assessment</li>
          <li>Regular content review for accuracy</li>
        </ul>

        <h3>Our Mission</h3>
        <p>
          To simplify preparation by delivering reliable, structured, and
          exam-focused knowledge that helps aspirants prepare efficiently.
        </p>

        <p className="closing">
          NMAI aims to be a credible academic resource built on
          consistency, clarity, and learner-centric design.
        </p>
      </div>
    </div>
  );
}