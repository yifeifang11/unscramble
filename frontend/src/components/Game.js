import React from "react";
import "../index.css";

const Game = ({
  message,
  scrambled,
  disable,
  newWord,
  sendGuess,
  guess,
  isSane,
  setScrambled,
  setGuess,
  answer,
}) => {
  // scramble function
  const scramble = (event) => {
    event.preventDefault();
    fetch("/scrambled")
      .then((response) => response.text())
      .then((data) => setScrambled(data));
  };

  return (
    <div className="param text-center flex flex-col items-center">
      <p className="text-xl mt-3">{message}</p>
      <p className="text-3xl my-3">{disable ? answer : scrambled}</p>

      <form
        className="flex flex-col items-center mt-2 mb-8"
        name="form"
        onSubmit={disable ? newWord : sendGuess}
      >
        <input
          className="inline-block border border-1 text-2xl"
          type="text"
          name="guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          required={!disable}
        ></input>
        <div className="flex flex-row-reverse mt-1">
          <input
            className="inline-block border border-1 px-3 py-1 rounded-md my-1 mx-1 cursor-pointer"
            type="submit"
            value={disable ? "Guess new word" : "Submit"}
            disabled={isSane}
          ></input>
          <button
            className="inline-block border border-1 px-3 py-1 rounded-md my-1 mx-1"
            onClick={scramble}
            disabled={isSane}
          >
            Re-scramble
          </button>
        </div>
      </form>
    </div>
  );
};

export default Game;
