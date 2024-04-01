import React from "react";
import Quiz from "./Quiz";

function Main() {
  const [isQuizStart, setIsQuizStart] = React.useState(false);

  function handleStartClick() {
    setIsQuizStart((preState) => !preState);
  }
  return (
    <>
      <main>
        {isQuizStart ? (
          <div className="container">
            <Quiz handleStartClick={handleStartClick} />
          </div>
        ) : (
          <div className="main">
            <h1 className="title">Quiz App</h1>
            <div className="description">
              <ul className="ulist">
                <li className="llist">
                  All the question are of multiple choice.
                </li>
                <li className="llist">You can only select one option.</li>
                <li className="llist">
                  You can't move to next question without selecting any option.
                </li>
                <li className="llist">No back-Tracking. </li>
              </ul>
            </div>

            <div className="startbtn">
              <button className="startbtnin" onClick={handleStartClick}>
                Start Quiz
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Main;
