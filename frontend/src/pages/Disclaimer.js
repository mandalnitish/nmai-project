import React from "react";
import { Helmet } from "react-helmet";
import "./StaticPages.css";

export default function Disclaimer() {
  return (
    <div className="static-page">
      <Helmet>
        <title>Disclaimer | NMAI</title>
        <meta
          name="description"
          content="Disclaimer for NMAI – Educational purpose, content accuracy, and liability information."
        />
      </Helmet>

      <div className="static-card">
        <h1>Disclaimer</h1>

        <p className="intro">
          The content published on NMAI is intended strictly for educational
          and informational purposes.
        </p>

        <p>
          While we strive to ensure accuracy and relevance, NMAI does not
          guarantee completeness or reliability of information. Readers are
          encouraged to verify official sources where necessary.
        </p>

        <p>
          NMAI is not affiliated with any government body or examination
          authority unless explicitly stated.
        </p>

        <p>
          We are not liable for any losses or consequences resulting from
          the use of information available on this website.
        </p>
      </div>
    </div>
  );
}