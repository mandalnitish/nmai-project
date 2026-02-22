import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FiChevronDown } from "react-icons/fi";
import "./FAQ.css";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "What is NMAI Current Affairs?",
      answer:
        "NMAI (National & Major Affairs India) is an exam-focused platform providing structured current affairs analysis, background context, and MCQs tailored for UPSC, SSC, Banking, Railway, and State PSC aspirants.",
    },
    {
      question: "Is NMAI free to use?",
      answer:
        "Yes, NMAI provides free access to most current affairs articles and MCQs. Additional exam-support tools or downloadable resources may be introduced in future.",
    },
    {
      question: "How is NMAI different from news websites?",
      answer:
        "Unlike regular news portals, NMAI presents content in an exam-oriented format. Articles include background explanation, static GK linkage, and possible exam-relevant perspectives.",
    },
    {
      question: "Which competitive exams are covered?",
      answer:
        "NMAI covers UPSC Civil Services, SSC exams, Banking exams, Railway recruitment exams, State PSC exams, and other government competitive examinations.",
    },
    {
      question: "Is the website mobile-friendly?",
      answer:
        "Yes, NMAI is fully responsive and optimized for smartphones, tablets, and desktops, ensuring smooth reading and navigation.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <Helmet>
        <title>FAQ | NMAI – Current Affairs Platform</title>
        <meta
          name="description"
          content="Frequently Asked Questions about NMAI – exam-focused current affairs platform for UPSC, SSC, Banking and State PSC."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          })}
        </script>
      </Helmet>

      <div className="faq-container">

        <div className="faq-header glass">
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about the NMAI platform</p>
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