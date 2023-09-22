import React from "react";
import "../index.css";

const Scoring = ({ sanity, score }) => {
  return (
    <div className="param text-center flex flex-col items-center">
      <div>
        <div className="flex mt-5 outline outline-2">
          {[...Array(sanity)].map(() => (
            <div
              className={`w-1 h-5 ${
                sanity > 69
                  ? "bg-green-400"
                  : sanity > 30
                  ? "bg-yellow-300"
                  : "bg-red-500"
              }`}
            ></div>
          ))}
          {[...Array(100 - sanity)].map(() => (
            <div className="w-1 h-5 bg-white"></div>
          ))}
        </div>
      </div>
      <div className="inline">
        <p className="my-2 inline-block mx-2">Sanity: {sanity}</p>
        <p className="inline-block mx-2">Correct: {score}</p>
      </div>
    </div>
  );
};

export default Scoring;
