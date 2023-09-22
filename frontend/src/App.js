import React from "react";
import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [sanity, setSanity] = useState(0);
  const [update, setUpdate] = useState(0);
  const [guess, setGuess] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [disable, setDisable] = useState(false);
  const [hideHint1, setHideHint1] = useState(true);
  const [hideHint2, setHideHint2] = useState(true);
  const [hideAnswer, setHideAnswer] = useState(true);
  const [isSane, setIsSane] = useState(false);
  const [scrambled, setScrambled] = useState("");
  const [numWrong, setNumWrong] = useState(0);

  const sanityBar = [];
  const fillSanityBar = () => {
    for (let i = 0; i < sanity; i++) {
      sanityBar.push("chungus");
    }
    console.log(sanityBar);
  };

  useEffect(() => {
    fetch("/count")
      .then((response) => response.text())
      .then((data) => setCount(data));
  }, [update]);

  useEffect(() => {
    fetch("/score")
      .then((response) => response.text())
      .then((data) => setScore(data));
  }, []);

  useEffect(() => {
    fetch("/wrong")
      .then((response) => response.text())
      .then((data) => setNumWrong(data));
  }, []);

  useEffect(() => {
    fetch("/message")
      .then((response) => response.text())
      .then((data) => setMessage(data));
  }, []);

  useEffect(() => {
    fetch("/answer")
      .then((response) => response.text())
      .then((data) => setAnswer(data));
  }, []);

  useEffect(() => {
    fetch("/scrambled")
      .then((response) => response.text())
      .then((data) => setScrambled(data));
  }, []);

  useEffect(() => {
    fetch("/sanity")
      .then((response) => response.json())
      .then((data) => {
        setSanity(data);
      });
  }, []);

  useEffect(() => {
    fetch("/isSane")
      .then((response) => response.json())
      .then((data) => {
        setIsSane(data.sanity);
      });
  }, []);

  useEffect(() => {
    fetch("/disabled")
      .then((response) => response.json())
      .then((data) => {
        setDisable(data.disable);
      });
  }, []);

  const sendGuess = (event) => {
    event.preventDefault();

    fillSanityBar();

    fetch("/count", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        count: parseInt(count) + 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCount(data.count);
        return;
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guessedWord: guess }),
    })
      .then((response) => response.text())
      .then((data) => {
        setGuess(data);
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guessedWord: guess }),
    })
      .then((response) => response.text())
      .then((data) => {
        setMessage(data);
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("/guess")
      .then((response) => response.text())
      .then((data) => setGuess(data));

    fetch("/disabled", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guessedWord: guess }),
    })
      .then((response) => response.json())
      .then((data) => {
        setDisable(data.disable);
        return;
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guessedWord: guess }),
    })
      .then((response) => response.json())
      .then((data) => {
        setScore(parseInt(data));
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("/sanity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guessedWord: guess }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSanity(parseInt(data));
        fetch("/isSane", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sanity: parseInt(data),
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setIsSane(data.isSane);
            return;
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("/wrong", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guessedWord: guess }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNumWrong(parseInt(data));
      })
      .catch((error) => {
        console.error(error);
      });

    setUpdate(update + 1);
  };

  const newWord = (event) => {
    event.preventDefault();

    fetch("/count", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: 0 }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCount(0);
        return;
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.text())
      .then((data) => {
        setAnswer(data);
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("/nextAnswer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).catch((error) => {
      console.error(error);
    });

    fetch("/disabled", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guessedWord: "" }),
    })
      .then((response) => response.json())
      .then((data) => {
        setDisable(data.disable);
        return;
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guessedWord: "" }),
    })
      .then((response) => response.text())
      .then((data) => {
        setGuess(data);
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guessedWord: "big chungus the greatest of them all!",
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        setMessage(data);
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("/scrambled")
      .then((response) => response.text())
      .then((data) => setScrambled(data));

    setHideHint1(true);
    setHideHint2(true);
    setHideAnswer(true);
  };

  const resetGame = (event) => {
    event.preventDefault();
    newWord(event);

    fetch("/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guessedWord: "big chungus the greatest of them all!",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setScore(parseInt(data));
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("/sanity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guessedWord: "big chungus the greatest of them all!",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSanity(parseInt(data));
        fetch("/isSane", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sanity: parseInt(data),
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setIsSane(data.isSane);
            return;
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const scramble = (event) => {
    event.preventDefault();
    fetch("/scrambled")
      .then((response) => response.text())
      .then((data) => setScrambled(data));
  };

  return (
    <div className="App">
      {isSane ? (
        <div className="text-center pt-10 flex flex-col items-center">
          <h1 className="text-5xl mb-5">BERKE</h1>
          <p>
            Ekreb figured out his name! It is Berke! Berke is very grateful for
            your help.
          </p>
          <p>
            You can replay the game by hitting reset game. Thanks for playing!
          </p>
          <div>
            <div className="flex mt-5 outline outline-2">
              {[...Array(sanity)].map(() => (
                <div
                  className="w-1 h-5 rainbow-bg"
                ></div>
              ))}
              {[...Array(100 - sanity)].map(() => (
                <div className="w-1 h-5 bg-white"></div>
              ))}
            </div>
          </div>
          <p className="mt-5 text-2xl mb-2">Stats</p>
          <p>Correct: {score}</p>
          <p className="mb-10">Wrong: {numWrong}</p>
          <button className="border border-1 px-3 py-1 rounded-md my-1" onClick={resetGame}>Restart game</button>
        </div>
      ) : (
        <div className="param text-center pt-10 flex flex-col items-center">
          <h1 id="title"  className="text-5xl mb-5">EKREB</h1>
          <p>
            Ekreb is having an identity crisis and can't figure out his name!
            Help him unscramble his name by unscrambling the words he gives you.
          </p>
          <p>
            Every time you guess correctly, you restore some of his sanity. Make
            his sanity reach 100 to unscramble his name!
          </p>
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
          <p className="text-xl mt-3">{message}</p>
          <p className="text-3xl my-3">{scrambled}</p>

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
              >
                Re-scramble
              </button>
            </div>
          </form>
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
            {hideHint2
              ? ""
              : `The last letter is '${answer[answer.length - 1]}'`}
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
      )}
    </div>
  );
}

export default App;
