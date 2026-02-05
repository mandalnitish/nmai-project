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
          content="Disclaimer for NMAI – Educational purpose, accuracy, and liability information."
        />
      </Helmet>

      <div className="static-card">
        <h1>Disclaimer</h1>

        <p className="intro">
          The information provided on <strong>NMAI</strong> is for educational
          and informational purposes only.
        </p>

        <p>
          While we strive to maintain accuracy and relevance, we do not
          guarantee the completeness or reliability of any content published
          on the platform.
        </p>

        <p>
          NMAI shall not be held responsible for any losses, damages, or
          consequences arising from the use of this website or its content.
        </p>

        <p className="closing">
          External links are provided for convenience and do not imply
          endorsement or responsibility for third-party content.
        </p>
      </div>
    </div>
  );
}
