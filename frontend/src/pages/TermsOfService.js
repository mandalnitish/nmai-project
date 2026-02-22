import React from "react";
import { Helmet } from "react-helmet";
import "./StaticPages.css";

export default function TermsOfService() {
  return (
    <div className="static-page">
      <Helmet>
        <title>Terms of Service | NMAI</title>
        <meta
          name="description"
          content="Terms of Service for NMAI – User responsibilities and content usage policy."
        />
      </Helmet>

      <div className="static-card">
        <h1>Terms of Service</h1>

        <p className="intro">
          By accessing NMAI, you agree to comply with the following terms.
        </p>

        <h3>User Responsibilities</h3>
        <ul>
          <li>Do not misuse or copy content without permission</li>
          <li>Do not attempt unauthorized system access</li>
          <li>Respect intellectual property rights</li>
        </ul>

        <h3>Intellectual Property</h3>
        <p>
          All original content on NMAI is protected by applicable copyright
          laws. Unauthorized reproduction or redistribution is prohibited.
        </p>

        <h3>Modifications</h3>
        <p>
          NMAI reserves the right to update these terms at any time.
        </p>
      </div>
    </div>
  );
}