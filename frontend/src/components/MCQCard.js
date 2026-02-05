import React, { useEffect, useState } from "react";
import "./MCQCard.css";

const MCQCard = ({
  mcq,
  selectedAnswer,
  onAnswer,
  showAnswer = false, // final result mode
}) => {
  const [selected, setSelected] = useState(null);

  const correctIndex = mcq.correctAnswer;

  /* ================= RESET ON QUESTION CHANGE ================= */
  useEffect(() => {
    setSelected(
      selectedAnswer !== undefined ? selectedAnswer : null
    );
  }, [mcq._id, selectedAnswer]);

  const isAnswered = selected !== null;
  const isCorrect = selected === correctIndex;

  const handleClick = (index) => {
    // lock only after selection
    if (isAnswered) return;

    setSelected(index);
    onAnswer?.(mcq._id, index);
  };

  const getOptionClass = (index) => {
    // FINAL RESULT MODE (after submit)
    if (showAnswer) {
      if (index === correctIndex) return "option correct";
      if (index === selected && index !== correctIndex)
        return "option wrong";
      return "option";
    }

    // LIVE QUIZ MODE (instant reveal)
    if (isAnswered) {
      if (index === correctIndex) return "option correct";
      if (index === selected && index !== correctIndex)
        return "option wrong";
      return "option";
    }

    // NOT ANSWERED YET
    return "option";
  };

  return (
    <div className="mcq-card">
      {/* HEADER */}
      <div className="mcq-header">
        <span className="mcq-category">{mcq.category}</span>
        {mcq.difficulty && (
          <span className={`mcq-difficulty ${mcq.difficulty.toLowerCase()}`}>
            {mcq.difficulty}
          </span>
        )}
      </div>

      {/* QUESTION */}
      <h3 className="mcq-question">{mcq.question}</h3>

      {/* OPTIONS */}
      <div className="mcq-options">
        {mcq.options.map((option, index) => (
          <div
            key={index}
            className={getOptionClass(index)}
            onClick={() => handleClick(index)}
          >
            <span className="option-label">
              {String.fromCharCode(65 + index)}.
            </span>

            <span className="option-text">{option}</span>

            {isAnswered && index === correctIndex && (
              <span className="option-icon correct-icon">✔</span>
            )}

            {isAnswered &&
              index === selected &&
              index !== correctIndex && (
                <span className="option-icon wrong-icon">✖</span>
              )}
          </div>
        ))}
      </div>

      {/* EXPLANATION (IMMEDIATE) */}
      {isAnswered && (
        <div className="mcq-explanation">
          <strong>{isCorrect ? "✅ Correct" : "❌ Incorrect"}</strong>
          <p>{mcq.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default MCQCard;
