import React from "react";
import Quiz from "./Quiz";

function Main() {
  const [isQuizStart, setIsQuizStart] = React.useState(false);
  const [name, setName] = React.useState("");

  const handleStartClick = () => {
    setIsQuizStart(true);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  return (
    <>
      <main>
        {isQuizStart ? (
          <div className="container">
            <Quiz name={name} />
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
            <div className="namefield">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleName}
                required
              />
            </div>
            <div className="startbtn">
              <button
                className="startbtnin"
                onClick={handleStartClick}
                // disabled={!name}
              >
                Start Quiz
              </button>
            </div>
            <p className="owner">
              By : &nbsp;
              <a href="https://www.github.com/RajaulAnsari/">
                MD. Rajaul Ansari
              </a>
            </p>
          </div>
        )}
      </main>
    </>
  );
}

export default Main;
