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
          At NMAI, we respect your privacy and are committed to protecting
          your personal information.
        </p>

        <h3>Information We Collect</h3>
        <ul>
          <li>Basic user details provided voluntarily</li>
          <li>Anonymous usage analytics data</li>
          <li>Cookies for performance and functionality</li>
        </ul>

        <h3>Advertising & Third-Party Services</h3>
        <p>
          NMAI may use third-party advertising services such as Google
          AdSense. These services may use cookies to serve ads based on
          prior visits to this website or other websites.
        </p>

        <p>
          Users may opt out of personalized advertising by visiting
          Google Ads Settings.
        </p>

        <h3>Data Protection</h3>
        <p>
          We implement reasonable security measures to protect user data
          against unauthorized access or misuse.
        </p>

        <p className="closing">
          Continued use of NMAI indicates acceptance of this policy.
        </p>
      </div>
    </div>
  );
}