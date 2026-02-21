import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import "./FAQ.css";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "What is NMAI Current Affairs?",
      answer:
        "NMAI Current Affairs provides daily current affairs, quizzes, and MCQs designed specifically for UPSC, SSC, Banking, Railway, and State PSC aspirants.",
    },
    {
      question: "Is the platform free?",
      answer:
        "Yes, most features are free. Premium content such as advanced analytics and PDFs may be introduced later.",
    },
    {
      question: "Which exams are covered?",
      answer:
        "UPSC, SSC, Banking, Railway, State PSC, and other competitive exams.",
    },
    {
      question: "Is dark mode supported?",
      answer:
        "Yes, NMAI supports modern dark mode with optimized readability and reduced eye strain.",
    },
    {
      question: "Can I use this on mobile?",
      answer:
        "Yes, the platform is fully responsive and optimized for all devices.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">

      <div className="faq-container">

        <div className="faq-header glass">
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about NMAI platform</p>
        </div>

        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`faq-item glass ${
                openIndex === index ? "active" : ""
              }`}
              onClick={() => toggleFAQ(index)}
            >

              <div className="faq-question">
                <h3>{faq.question}</h3>
                <FiChevronDown
                  className={`faq-icon ${
                    openIndex === index ? "rotate" : ""
                  }`}
                />
              </div>

              <div
                className={`faq-answer ${
                  openIndex === index ? "show" : ""
                }`}
              >
                <p>{faq.answer}</p>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}