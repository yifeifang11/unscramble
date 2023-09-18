const express = require("express");
const bodyparser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

let guess = 'not answer';
let message = 'Guess the word!';
let answer = '';
let count = 0;

app.get('/count', (req, res) => {
  res.send(`${count}`);
});

app.post('/count', (req, res) => {
  count = req.body.count;
  console.log(count);
})

app.get('/api', (req, res) => {
    res.send(answer);
});

app.get('/guess', (req, res) => {
  res.send(guess);
});

app.post('/guess', (req, res) => {
    guess = req.body.answered;
    console.log(guess, answer, guess == answer);
    if (guess == answer) {
      message = 'Wow! You got it!';
    } else {
      message = 'Incorrect dumbass. Try again!';
    }
});

app.get('/message', (req, res) => {
  if (count == 0) {
    res.send('Guess the word!');
  } else {
    res.send(message);
  }
});

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://random-word-api.herokuapp.com/word',
  headers: { }
};


  axios.request(config)
.then((response) => {
  answer = (response.data[0]);
})
.catch((error) => {
  console.log(error);
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});