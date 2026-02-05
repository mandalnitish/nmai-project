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
          content="Terms of Service for using NMAI – user responsibilities, content usage, and policies."
        />
      </Helmet>

      <div className="static-card">
        <h1>Terms of Service</h1>

        <p className="intro">
          By accessing or using <strong>NMAI</strong>, you agree to comply with
          the following Terms of Service.
        </p>

        <h3>User Responsibilities</h3>
        <ul>
          <li>Do not misuse content or platform services</li>
          <li>Do not attempt unauthorized access or disruption</li>
          <li>Respect intellectual property and copyrights</li>
        </ul>

        <h3>Content Usage</h3>
        <p>
          All content published on NMAI is protected by copyright laws and may
          not be copied, reproduced, or redistributed without permission.
        </p>

        <p className="closing">
          NMAI reserves the right to modify these terms at any time without
          prior notice.
        </p>
      </div>
    </div>
  );
}
