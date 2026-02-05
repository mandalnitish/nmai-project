import React from "react";
import { Helmet } from "react-helmet";
import "./StaticPages.css";

export default function PrivacyPolicy() {
  return (
    <div className="static-page">
      <Helmet>
        <title>Privacy Policy | NMAI</title>
        <meta
          name="description"
          content="Privacy Policy of NMAI – Learn how we collect, use, and protect user information."
        />
      </Helmet>

      <div className="static-card">
        <h1>Privacy Policy</h1>

        <p className="intro">
          At <strong>NMAI (National & Major Affairs India)</strong>, we respect
          your privacy and are committed to protecting your personal data.
        </p>

        <h3>Information We Collect</h3>
        <ul>
          <li>Personal details provided during registration</li>
          <li>Usage data such as pages visited and interactions</li>
          <li>Cookies for analytics, performance, and security</li>
        </ul>

        <h3>How We Use Your Information</h3>
        <p>
          The information collected is used to improve content quality,
          personalize the learning experience, maintain platform security,
          and enhance overall usability.
        </p>

        <h3>Data Security</h3>
        <p>
          We implement standard security measures to safeguard your data from
          unauthorized access, misuse, or disclosure.
        </p>

        <p className="closing">
          By using NMAI, you consent to this Privacy Policy and its terms.
        </p>
      </div>
    </div>
  );
}
