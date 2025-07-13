import React, { useState } from "react";
import NameForm from "./components/NameForm";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { Container, Paper } from "@mui/material";

export default function App() {
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState("");
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        {step === 1 && (
          <NameForm setUserName={setUserName} onNext={() => setStep(2)} />
        )}
        {step === 2 && (
          <Quiz
            userName={userName}
            setAnswers={setAnswers}
            setScore={setScore}
            questions={questions}
            setQuestions={setQuestions}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <Result
            userName={userName}
            answers={answers}
            score={score}
            questions={questions}
          />
        )}
      </Paper>
    </Container>
  );
}