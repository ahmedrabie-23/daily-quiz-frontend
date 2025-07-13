import React, { useState, useEffect } from "react";

export default function Quiz({ userName, setAnswers, setScore, questions, setQuestions, onNext }) {
  const [userAnswers, setUserAnswers] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch questions only if they haven't been loaded yet
    if (questions.length === 0) {
      fetch("http://localhost:5000/questions")
        .then(res => res.json())
        .then(data => setQuestions(data))
        .catch(() => setError("Failed to load questions"));
    }
  }, [questions, setQuestions]);

  const handleChange = (qId, value) => {
    setUserAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation: all answers required
    if (Object.keys(userAnswers).length !== questions.length) {
      setError("Please answer all questions.");
      return;
    }
    // Calculate score
    let sc = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[q.id] && userAnswers[q.id].toLowerCase() === q.answer.toLowerCase()) sc += 1;
    });
    setAnswers(userAnswers);
    setScore(sc);
    onNext();
  };

  if (error) return <div>{error}</div>;
  if (!questions || !questions.length) return <div>Loading questions...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Quiz for {userName}</h2>
      {questions.map((q, idx) => (
        <div key={q.id}>
          <label>
            <strong>{idx + 1}. {q.text}</strong><br/>
            <input
              type="text"
              value={userAnswers[q.id] || ""}
              onChange={e => handleChange(q.id, e.target.value)}
              required
            />
          </label>
        </div>
      ))}
      <button type="submit">Submit Answers</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}