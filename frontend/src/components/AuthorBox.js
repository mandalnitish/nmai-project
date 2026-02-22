// components/AuthorBox.jsx
import React from "react";
import { FiGlobe, FiLinkedin, FiInstagram } from "react-icons/fi";
import "./AuthorBox.css";

const AuthorBox = () => {
  return (
    <div className="author-box">
      <div className="author-image-wrapper">
        <img
          src="/author-nitish.jpg" // replace with your actual image path
          alt="Nitish Mandal"
          className="author-image"
        />
      </div>

      <div className="author-content">
        <div className="author-header">
          <h3 className="author-name">Nitish Mandal</h3>
          <span className="author-role">
            Founder & Editorial Strategist – NMAI
          </span>
        </div>

        <p className="author-bio">
          Nitish Mandal is a Computer Engineer and Founder of NMAI,
          focused on building structured, exam-centric current affairs
          systems. His work emphasizes analytical clarity, conceptual depth,
          and framework-driven learning for serious competitive exam aspirants.
        </p>

        <div className="author-links">
          <a href="https://www.nmai.in/about-us" target="_blank" rel="noopener noreferrer">
            <FiGlobe /> Website
          </a>
          <a href="https://www.linkedin.com/in/mandalnitish" target="_blank" rel="noopener noreferrer">
            <FiLinkedin /> LinkedIn
          </a>
          <a href="https://instagram.com/nitishhmandal" target="_blank" rel="noopener noreferrer">
            <FiInstagram /> Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthorBox;