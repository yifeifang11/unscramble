import React from 'react';
import axios from 'axios';

function App() {

  const [answer, setAnswer] = React.useState(null);
  const [guess, setGuess] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    axios.get('/guess').then((response) => {
      setGuess(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get('/message').then((response) => {
      setMessage(response.data);
    });
  }, [count]);

  React.useEffect(() => {
    axios.get('/api').then((response) => {
      setAnswer(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get('/count').then((response) => {
      setCount(response.data);
    });
  }, [count]);

const submit = (event) => {
  event.preventDefault();
    axios
      .post('/guess', { answered: guess })
      .then((response) => {
        setGuess(response.data);
      });
    axios
      .post('/count', { count: count })
      .then((response) => {
        setCount(response.data);
      });

  }

  const resetCount = () => {
    setCount(0);
  }

  const reset = (event) => {
    event.preventDefault();
    setCount(0);
    axios
      .post('/guess', { answered: '' })
      .then((response) => {
        setGuess(response.data);
      });
    axios
      .post('/count', {count: 0})
      .then((response) => {
        setCount(response.data);
      });
      resetCount();
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
        <p>{answer}</p>
        <p>{guess}</p>
        <p>{count}</p>
          <form name='form' onSubmit={submit}>
            <input type="text" name='guess' value={guess} onChange={e => setGuess(e.target.value)} required></input>
            <input type="submit" value="Submit" onClick={() => setCount(count+1)}></input>
          </form>
          <button onClick={reset}>Restart</button>
        
      </header>
    </div>
  );
}

export default App;
