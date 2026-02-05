import React from "react";
import { Helmet } from "react-helmet";
import "./StaticPages.css";

export default function ContactUs() {
  return (
    <div className="static-page">
      <Helmet>
        <title>Contact Us | NMAI</title>
        <meta
          name="description"
          content="Contact NMAI for support, feedback, or suggestions related to current affairs and exam preparation."
        />
      </Helmet>

      <div className="static-card">
        <h1>Contact Us</h1>

        <p className="intro">
          Have questions, feedback, or suggestions?  
          We’re always happy to hear from students and educators.
        </p>

        <div className="contact-box">
          <div>
            <h4>Email</h4>
            <p>support@nmai.in</p>
          </div>

          <div>
            <h4>Website</h4>
            <p>www.nmai.in</p>
          </div>
        </div>

        <p className="closing">
          We aim to respond to all queries within
          <strong> 24–48 hours</strong>.
        </p>
      </div>
    </div>
  );
}
