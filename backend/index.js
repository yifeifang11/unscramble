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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let score = 0;
let guess = '';
let answer = '';
let nextAnswer = '';
let message = 'Guess the word';

app.get('/score', (req, res) => {
    res.send(`${score}`);
});

app.post('/score', (req, res) => {
    score = req.body.count;
    res.send(`${score}`);
});

app.get('/message', (req, res) => {
    res.send(message);
});

app.post('/message', (req, res) => {
    let temp = req.body.guessedWord;
    console.log(temp, answer);
    if (score == 0) {
        message = 'Guess the word'
        res.end(message);
    } else if (temp === answer) {
        message = 'Good job';
    } else if (temp !== answer) {
        message = 'Try again';
    }
    res.send(message);
});

app.get('/guess', (req, res) => {
    res.send(guess);
});

app.post('/guess', (req, res) => {
    guess = req.body.guessedWord;
    res.send(guess);
});

app.get('/answer', (req, res) => {
     
        console.log(answer);

    res.send(answer);
});

app.post('/answer', (req, res) => {
//     axios.request(config)
// .then((response) => {
//   answer = response.data[0];
// })
// .catch((error) => {
//   console.log(error);
// });
//     res.send(answer);
    answer = nextAnswer;
    res.send(answer);
});

app.get('/nextAnswer', (req, res) => {
    res.send(nextAnswer);
});

app.post('/nextAnswer', (req, res) => {
    axios.request(config)
.then((response) => {
  nextAnswer = response.data[0];
})
.catch((error) => {
  console.log(error);
});
    res.send(nextAnswer);
});

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://random-word-api.herokuapp.com/word',
  headers: { }
};

axios.request(config)
.then((response) => {
  answer = response.data[0];
})
.catch((error) => {
  console.log(error);
});

axios.request(config)
.then((response) => {
  nextAnswer = response.data[0];
})
.catch((error) => {
  console.log(error);
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });