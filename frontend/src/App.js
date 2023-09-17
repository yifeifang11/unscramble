import React from 'react'
import { useState } from 'react';
import Axios from 'axios';

const App = () => {
  const [guess, setGuess] = useState('chungus')
  const onSubmit = (e) => {
      e.preventDefault()

      if(!guess) {
        alert('Please guess a word')
        return
      }

      setGuess(guess)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type='text' placeholder='Enter guess' value={guess} onChange={(e) => setGuess(e.target.value)} />
        <input type="submit" value="Submit"></input>
      </form>
      <p>{guess}</p>
    </div>
  )
}

export default App
