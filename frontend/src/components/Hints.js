import React from "react";
import "../index.css";

const Hints = ({
  hideHint1,
  setHideHint1,
  hideHint2,
  setHideHint2,
  answer,
  disable,
  newWord,
  hideAnswer,
  setHideAnswer,
}) => {
  return (
    <div className="daniels text-center flex flex-col items-center">
      <button
        className="border border-1 px-3 py-1 rounded-md my-1"
        onClick={() => setHideHint1(!hideHint1)}
      >
        {hideHint1 ? "Show hint 1" : "Hide hint 1"}
      </button>
      <p>{hideHint1 ? "" : `The first letter is '${answer[0]}'`}</p>
      <button
        className="border border-1 px-3 py-1 rounded-md my-1"
        onClick={() => setHideHint2(!hideHint2)}
      >
        {hideHint2 ? "Show hint 2" : "Hide hint 2"}
      </button>
      <p>
        {hideHint2 ? "" : `The last letter is '${answer[answer.length - 1]}'`}
      </p>
      <button
        className="inline-block border border-1 px-3 py-1 rounded-md my-1 mx-1"
        disabled={disable}
        onClick={newWord}
      >
        Try another word
      </button>
      <button
        className="border border-1 px-3 py-1 rounded-md my-1"
        onClick={() => setHideAnswer(!hideAnswer)}
      >
        {hideAnswer ? "Show answer" : "Hide answer"}
      </button>
      <p>{hideAnswer ? "" : `${answer}`}</p>
    </div>
  );
};

export default Hints;
