import React from 'react';
import { useState, useEffect } from 'react';

function App() {

  const [score, setScore] = useState(0);
  const [update, setUpdate] = useState(0);
  const [guess, setGuess] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    fetch('/score')
        .then(response => response.text())
        .then(data => setScore(data));
  }, [update]);

  useEffect(() => {
    fetch('/message')
        .then(response => response.text())
        .then(data => setMessage(data));
  }, [update]);

  useEffect(() => {
    fetch('/answer')
        .then(response => response.text())
        .then(data => setAnswer(data));
  }, []);

  const sendGuess = event => {
    event.preventDefault();

    fetch('/score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count: parseInt(score)+1 })
   })
   .then(response => response.json())
      .then(data => {setScore(data.count); return;})
      .catch(error => {
        console.error(error);
      });

      fetch('/guess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guessedWord: guess })
       })
      //  .then(response => response.text())
      //  .then(data => {console.log(data); setGuess(data);})
          .catch(error => {
            console.error(error);
          });;

          fetch('/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ guessedWord: guess })
           })
           .then(response => response.text())
              .then(data => {setGuess(data.guessedWord); return;})
              .catch(error => {
                console.error(error);
              });
              fetch('/guess')
              .then(response => response.text())
              .then(data => setGuess(data));


      setUpdate(update + 1);


  }

  const resetGame = event => {
    event.preventDefault();

    fetch('/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ count: 0 })
     })
     .then(response => response.json())
        .then(data => {setScore(0); return;})
        .catch(error => {
          console.error(error);
        });

        fetch('/answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
         })
         .then(response => response.text())
        .then(data => {
          setAnswer(data);
        })
            .catch(error => {
              console.error(error);
            });

            fetch('/nextAnswer', {
              method: 'POST',
             })
    
                .catch(error => {
                  console.error(error);
                });

   }

  return (
    <div className="App">
      <h1>BERKE</h1>
        <p>Number of guesses: {score}</p>
        <button onClick={resetGame}>Reset</button>

        <p>Guess: {guess}</p>
        <p>Answer: {answer}</p>
        <p>Message: {message}</p>

        <form name='form' onSubmit={sendGuess}>
            <input type="text" name='guess' value={guess} onChange={e => setGuess(e.target.value)} required></input>
            <input disabled={disable} type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default App;
