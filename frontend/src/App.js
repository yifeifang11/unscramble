import React from "react";
import { useState, useEffect } from "react";

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
  const [isSane, setIsSane] = useState(false);
  const [scrambled, setScrambled] = useState("");
  const [title, setTitle] = useState("EKREB");

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

  const sendGuess = (event) => {
    event.preventDefault();

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
            console.log(data.isSane);
            return;
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });

    // fetch("/isSane", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     sanity: parseInt(sanity),
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setIsSane(data.isSane);
    //     console.log(data.isSane);
    //     return;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    setUpdate(update + 1);
  };

  const resetGame = (event) => {
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
  };

  return (
    <div className="App">
      <h1>{isSane ? "BERKE" : "EKREB"}</h1>
      <p>
        Ekreb is having an identity crisis and can't figure out his name! Help
        him unscramble his name by unscrambling the words he gives you.
      </p>
      <p>
        Every time you guess correctly, you restore some of his sanity. Make his
        sanity reach 100 to unscramble his name!
      </p>
      <p>Sanity: {sanity}</p>
      <p>Number of guesses: {count}</p>
      <p>Score: {score}</p>
      <p>Guess: {guess}</p>
      <p>Scrambled word: {scrambled}</p>
      <p>Message: {message}</p>
      <p>Is sane: {isSane}</p>
      <button onClick={() => setHideHint1(!hideHint1)}>
        {hideHint1 ? "Show hint 1" : "Hide hint 1"}
      </button>
      <p>{hideHint1 ? "" : `The first letter is '${answer[0]}'`}</p>
      <button onClick={() => setHideHint2(!hideHint2)}>
        {hideHint2 ? "Show hint 2" : "Hide hint 2"}
      </button>
      <p>
        {hideHint2 ? "" : `The last letter is '${answer[answer.length - 1]}'`}
      </p>
      <p>Answer: {answer}</p>
      <button disabled={disable} onClick={resetGame}>
        Give up
      </button>

      <form name="form" onSubmit={disable ? resetGame : sendGuess}>
        <input
          type="text"
          name="guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          required={!disable}
        ></input>
        <input
          type="submit"
          value={disable ? "Guess new word" : "Submit"}
        ></input>
      </form>
    </div>
  );
}

export default App;
