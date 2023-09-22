import React from "react";
import "../index.css";

const Completed = ({ sanity, score, numWrong, resetGame }) => {
  return (
    <div className="daniels text-center pt-10 flex flex-col items-center">
      <h1 className="text-5xl mb-5">BERKE</h1>
      <p>
        Ekreb figured out his name! It is Berke! Berke is very grateful for your
        help.
      </p>
      <p>You can replay the game by hitting reset game. Thanks for playing!</p>
      <div>
        <div className="flex mt-5 outline outline-2">
          {[...Array(sanity)].map(() => (
            <div className="w-1 h-5 rainbow-bg"></div>
          ))}
          {[...Array(100 - sanity)].map(() => (
            <div className="w-1 h-5 bg-white"></div>
          ))}
        </div>
      </div>
      <p className="mt-5 text-2xl mb-2">Stats</p>
      <p>Correct: {score}</p>
      <p className="mb-10">Wrong: {numWrong}</p>
      <button
        className="border border-1 px-3 py-1 rounded-md my-1"
        onClick={resetGame}
      >
        Restart game
      </button>
    </div>
  );
};

export default Completed;
