import React from 'react';
import axios from 'axios';

function App() {

  const [answer, setAnswer] = React.useState('');
  const [guess, setGuess] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    // axios.get('/guess').then((response) => {
    //   setGuess(response.data);
    // });
    axios.get('/api').then((response) => {
      setAnswer(response.data);
    }).catch((err) => {console.log(err)});
  }, []);

  React.useEffect(() => {
    axios.get('/count').then((response) => {
      setCount(response.data);
    }).catch((err) => {console.log(err)});
  }, [count]);

    React.useEffect(() => {
      axios.get('/message').then((response) => {
        setMessage(response.data);
      }).catch((err) => {console.log(err)});
    }, [count]);
   

const submit = (event) => {
  event.preventDefault();
    axios
      .post('/guess', { answered: guess })
      .then((response) => {
        setGuess(response.data);
      }, (error) => {
        console.log(error);
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
    axios
      .post('/guess', { answered: '' })
      .then((response) => {
        console.log(response.data);
      });
    axios
      .post('/count', {count: 0})
      .then((response) => {
        setCount(response.data);
      });
      resetCount();
    axios
      .post('/api', { })
      .then((response) => {
        setAnswer(response.data);
      });
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
          <button onClick={(e) => reset(e)}>Restart</button>
        
      </header>
    </div>
  );
}

export default App;
