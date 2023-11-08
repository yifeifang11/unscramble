import React from "react";
import { useState, useEffect } from "react";
import "./index.css";
import Header from "./components/Header";
import Scoring from "./components/Scoring";
import Game from "./components/Game";
import Hints from "./components/Hints";
import Completed from "./components/Completed";
import useSound from "use-sound";
import correctSoundFile from "./sounds/correct.wav";
import wrongSoundFile from "./sounds/wrong.wav";

function App() {
  // state
  // see comments below for usage of each state
  const [score, setScore] = useState(0);
  const [sanity, setSanity] = useState(0);
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

  const [correctSound] = useSound(correctSoundFile);
  const [wrongSound] = useSound(wrongSoundFile);

  useEffect(() => {
    // keeps track of number of correct guesses
    fetch("https://ekreb-backend.onrender.com/score")
      .then((response) => response.text())
      .then((data) => setScore(data));

    // retrieves message displayed to the user (guess the word, try again, good job)
    fetch("https://ekreb-backend.onrender.com/message")
      .then((response) => response.text())
      .then((data) => setMessage(data));

    // retrieves the answer to the scrambled word
    fetch("https://ekreb-backend.onrender.com/answer")
      .then((response) => response.text())
      .then((data) => setAnswer(data));

    // retrieves the scrambled version of the word
    fetch("https://ekreb-backend.onrender.com/scrambled")
      .then((response) => response.text())
      .then((data) => setScrambled(data));

    // retrieves the sanity count
    fetch("https://ekreb-backend.onrender.com/sanity")
      .then((response) => response.json())
      .then((data) => setSanity(data.sanity));

    // retrives whether the game is completed or not (whether sanity reached 100)
    fetch("https://ekreb-backend.onrender.com/isSane")
      .then((response) => response.json())
      .then((data) => setIsSane(data.sanity));

    // retrieves boolean for whether the submit button is disabled or not
    // disabled when correct guess is made --> submit button will retrieve the next word instead
    fetch("https://ekreb-backend.onrender.com/disabled")
      .then((response) => response.json())
      .then((data) => setDisable(data.disable));
  }, []);

  // function for sending a guess to the backend
  // updates many variables, see comments inside function for usages
  const sendGuess = (event) => {
    event.preventDefault();

    // send guess to backend
    fetch("https://ekreb-backend.onrender.com/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guessedWord: guess }),
    })
      .then((response) => response.text())
      .then((data) => setGuess(data))
      .catch((error) => console.error(error));

    // retrieve new message
    // message displays whether user was correct or incorrect
    fetch("https://ekreb-backend.onrender.com/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guessedWord: guess }),
    })
      .then((response) => response.text())
      .then((data) => {
        setMessage(data);
        if (data === "Good job! Click 'Guess new word' to keep guessing!") {
          correctSound();
        } else {
          wrongSound();
        }
      })
      .catch((error) => console.error(error));

    // retrieves guess to maintain current user guess in textbox
    fetch("https://ekreb-backend.onrender.com/guess")
      .then((response) => response.text())
      .then((data) => setGuess(data));

    // sends guess to backend, retrieves whether submit button is disabled or not

    fetch("https://ekreb-backend.onrender.com/disabled", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guessedWord: guess }),
    })
      .then((response) => response.json())
      .then((data) => setDisable(data.disable))
      .catch((error) => console.error(error));

    // sends guess to backend, retrieves whether score should be incremented or not

    fetch("https://ekreb-backend.onrender.com/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guessedWord: guess }),
    })
      .then((response) => response.json())
      .then((data) => setScore(parseInt(data)))
      .catch((error) => console.error(error));

    // retrieves new sanity and boolean isSane (whether game is completed or not)

    fetch("https://ekreb-backend.onrender.com/sanity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guessedWord: guess }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSanity(parseInt(data));

        // determines if game is finished or not based on backend response
        // data contains new amount of sanity
        fetch("https://ekreb-backend.onrender.com/isSane", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sanity: parseInt(data),
          }),
        })
          .then((response) => response.json())
          .then((data) => setIsSane(data.isSane))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));

    // incremenets number of wrong guesses if guess is wrong
    fetch("https://ekreb-backend.onrender.com/wrong", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guessedWord: guess }),
    })
      .then((response) => response.json())
      .then((data) => setNumWrong(parseInt(data)))
      .catch((error) => console.error(error));
  };

  // function to retrieve new word
  const newWord = (event) => {
    event.preventDefault();

    // retrieve new answer to be guessed
    fetch("https://ekreb-backend.onrender.com/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.text())
      .then((data) => setAnswer(data))
      .catch((error) => console.error(error));

    // set up the next answer to be retrieved
    fetch("https://ekreb-backend.onrender.com/nextAnswer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).catch((error) => console.error(error));

    // reset disabled so user can submit next word
    fetch("https://ekreb-backend.onrender.com/disabled", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guessedWord: "" }),
    })
      .then((response) => response.json())
      .then((data) => setDisable(data.disable))
      .catch((error) => console.error(error));

    // set guess to empty string
    fetch("https://ekreb-backend.onrender.com/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guessedWord: "" }),
    })
      .then((response) => response.text())
      .then((data) => setGuess(data))
      .catch((error) => console.error(error));

    // reset message displayed to user
    fetch("https://ekreb-backend.onrender.com/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guessedWord: "big chungus the greatest of them all!",
      }),
    })
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error(error));

    // retrieve new scrambled word
    fetch("https://ekreb-backend.onrender.com/scrambled")
      .then((response) => response.text())
      .then((data) => setScrambled(data));

    // close hints and answer if user used hints or answer
    setHideHint1(true);
    setHideHint2(true);
    setHideAnswer(true);
  };

  // reset game when user finishes game
  const resetGame = (event) => {
    event.preventDefault();

    // call function for retrieving new word
    newWord(event);

    // reset score
    fetch("https://ekreb-backend.onrender.com/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guessedWord: "big chungus the greatest of them all!",
      }),
    })
      .then((response) => response.json())
      .then((data) => setScore(parseInt(data)))
      .catch((error) => console.error(error));

    // reset sanity to 5
    fetch("https://ekreb-backend.onrender.com/sanity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guessedWord: "big chungus the greatest of them all!",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSanity(parseInt(data));

        // reset isSane to false so game can restart
        fetch("https://ekreb-backend.onrender.com/isSane", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sanity: parseInt(data),
          }),
        })
          .then((response) => response.json())
          .then((data) => setIsSane(data.isSane))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));

    // reset number of wrong guesses
    fetch("https://ekreb-backend.onrender.com/wrong", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guessedWord: "big chungus the greatest of them all!",
      }),
    })
      .then((response) => response.json())
      .then((data) => setNumWrong(parseInt(data)))
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      {isSane ? (
        <Completed
          sanity={sanity}
          score={score}
          numWrong={numWrong}
          resetGame={resetGame}
        />
      ) : (
        <div>
          <Header />
          <Scoring sanity={sanity} score={score} />
          <Game
            message={message}
            scrambled={scrambled}
            disable={disable}
            newWord={newWord}
            sendGuess={sendGuess}
            guess={guess}
            isSane={isSane}
            setScrambled={setScrambled}
            setGuess={setGuess}
            answer={answer}
          />
          <Hints
            hideHint1={hideHint1}
            setHideHint1={setHideHint1}
            hideHint2={hideHint2}
            setHideHint2={setHideHint2}
            answer={answer}
            disable={disable}
            newWord={newWord}
            hideAnswer={hideAnswer}
            setHideAnswer={setHideAnswer}
          />
        </div>
      )}
      <p className="daniels text-center mt-10">
        Check out the code{" "}
        <a
          className="underline"
          href="https://github.com/yifeifang11/unscramble"
        >
          here
        </a>
        !
      </p>
    </div>
  );
}

export default App;
