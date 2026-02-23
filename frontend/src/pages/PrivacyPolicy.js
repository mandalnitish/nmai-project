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
          content="Read the Privacy Policy of NMAI (nmai.in) to understand how we collect, use, and protect your personal data."
        />
      </Helmet>

      <div className="static-card">
        <h1>Privacy Policy</h1>

        <p className="intro">
          Last Updated: February 2026
        </p>

        <p>
          NMAI (https://www.nmai.in) values your privacy. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you visit our website.
          By using this website, you agree to the practices described in this policy.
        </p>

        <h3>1. Information We Collect</h3>
        <p>We may collect the following types of information:</p>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, and other details provided during registration or contact.</li>
          <li><strong>Usage Data:</strong> IP address, browser type, device information, pages visited, time spent, and referring URLs.</li>
          <li><strong>Cookies & Tracking Data:</strong> Information collected through cookies and similar technologies.</li>
        </ul>

        <h3>2. How We Use Your Information</h3>
        <ul>
          <li>To operate and maintain the website</li>
          <li>To improve user experience and content</li>
          <li>To provide quizzes, articles, and services</li>
          <li>To respond to user inquiries</li>
          <li>To display relevant advertisements</li>
        </ul>

        <h3>3. Google AdSense & Advertising</h3>
        <p>
          We use Google AdSense, a third-party advertising service provided by Google.
          Google may use cookies (including the DoubleClick cookie) to serve ads based
          on your prior visits to this website or other websites.
        </p>

        <p>
          Google’s use of advertising cookies enables it and its partners to serve
          personalized ads based on users' browsing behavior.
        </p>

        <p>
          Users may opt out of personalized advertising by visiting:
          https://adssettings.google.com/
        </p>

        <p>
          For more information on how Google uses data, visit:
          https://policies.google.com/technologies/ads
        </p>

        <h3>4. Cookies Policy</h3>
        <p>
          Cookies are small files stored on your device to improve functionality,
          analytics, and advertising performance.
        </p>
        <p>
          You can choose to disable cookies through your browser settings.
          However, some parts of the website may not function properly if cookies are disabled.
        </p>

        <h3>5. Third-Party Services</h3>
        <p>
          We may use third-party services such as Google Analytics to monitor
          and analyze website traffic. These services may collect information
          sent by your browser as part of a web page request.
        </p>

        <h3>6. Data Security</h3>
        <p>
          We implement reasonable administrative and technical safeguards to protect
          your personal data. However, no method of transmission over the internet
          is 100% secure.
        </p>

        <h3>7. Your Data Rights</h3>
        <p>
          Depending on your location, you may have rights under applicable laws
          (such as GDPR, CCPA, or India’s DPDP Act), including:
        </p>
        <ul>
          <li>The right to access your data</li>
          <li>The right to request correction or deletion</li>
          <li>The right to withdraw consent</li>
          <li>The right to restrict processing</li>
        </ul>

        <h3>8. Children's Information</h3>
        <p>
          NMAI does not knowingly collect personal information from children under 13.
          If you believe that a child has provided personal data, please contact us.
        </p>

        <h3>9. External Links</h3>
        <p>
          Our website may contain links to external websites. We are not responsible
          for the privacy practices or content of third-party sites.
        </p>

        <h3>10. Changes to This Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page with an updated revision date.
        </p>

        <h3>11. Contact Us</h3>
        <p>
          If you have any questions regarding this Privacy Policy, you may contact us at:
        </p>
        <p>
          Email: support@nmai.in
        </p>

        <p className="closing">
          By continuing to use NMAI, you acknowledge that you have read and
          understood this Privacy Policy.
        </p>
      </div>
    </div>
  );
}