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
          content="Contact NMAI for academic queries, feedback, corrections, or collaboration related to exam-focused current affairs."
        />
      </Helmet>

      <div className="static-card">
        <h1>Contact Us</h1>

        <p className="intro">
          NMAI values communication with aspirants, educators, and readers.
          If you have questions, suggestions, content corrections, or partnership
          inquiries, feel free to reach out.
        </p>

        <div className="contact-box">
          <div>
            <h4>Official Email</h4>
            <p>nitishmandal367@gmail.com</p>
          </div>

          <div>
            <h4>Website</h4>
            <p>https://www.nmai.in</p>
          </div>

          <div>
            <h4>Response Time</h4>
            <p>Within 24–48 business hours</p>
          </div>
        </div>

        <p className="closing">
          We strive to maintain accuracy and appreciate users who help us
          improve content quality.
        </p>
      </div>
    </div>
  );
}