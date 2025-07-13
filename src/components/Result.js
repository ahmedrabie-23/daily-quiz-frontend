import React, { useEffect, useState } from "react";

export default function Result({ userName, answers, score, questions }) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // POST submission
    fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: userName,
        answers,
        score,
        time: new Date().toISOString()
      })
    })
    .then(() => setSubmitted(true))
    .catch(() => setSubmitted(true)); // ignore error for demo
  }, [userName, answers, score]);

  return (
    <div>
      <h2>Results for {userName}</h2>
      <h3>Your score: {score} / {questions.length}</h3>
      <hr />
      <h3>Correct Answers:</h3>
      <ul>
        {questions.map((q, idx) => (
          <li key={q.id}>
            <strong>{q.text}</strong><br/>
            Your answer: <b>{answers[q.id]}</b><br/>
            Correct answer: <b>{q.answer}</b>
          </li>
        ))}
      </ul>
      {submitted && <div>Thank you! Your answers were submitted.</div>}
    </div>
  );
}