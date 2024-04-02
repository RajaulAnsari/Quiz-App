import React, { useEffect, useState } from "react";
import he from "he";

function Quiz({ name }) {
  if (!name) {
    name = "Anonymous";
  }
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        const decodedQuestions = data.results.map((question) => ({
          ...question,
          question: he.decode(question.question),
          incorrect_answers: question.incorrect_answers.map((answer) =>
            he.decode(answer)
          ),
          correct_answer: he.decode(question.correct_answer),
        }));
        setQuestions(decodedQuestions);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleRestartButtonClick = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    window.location.reload();
  };

  if (!questions || questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (showScore) {
    return (
      <>
        <div className="userName">
          <p>UserName: {name}</p>
        </div>
        <div className="restartdiv">
          <h1 className="title">Quiz App</h1>
          <h2>
            Your score is {score} out of {questions.length}
          </h2>

          <button className="restart" onClick={handleRestartButtonClick}>
            Restart
          </button>
        </div>
      </>
    );
  }
  return (
    <div>
      <div className="userName">
        <p>UserName: {name}</p>
      </div>
      <h1 className="title">Quiz App</h1>
      <h2>Question No: {currentQuestion + 1}</h2>
      <h3>{questions[currentQuestion]?.question}</h3>
      <div>
        {questions[currentQuestion]?.incorrect_answers.map((answer, index) => (
          <button
            className="inquizbtn"
            key={index}
            onClick={() => handleAnswerButtonClick(false)}
          >
            {answer}
          </button>
        ))}
        <button
          className="inquizbtn"
          onClick={() => handleAnswerButtonClick(true)}
        >
          {questions[currentQuestion]?.correct_answer}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
