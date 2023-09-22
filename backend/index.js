const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

let guess = ""; // user guess
let answer = ""; // word user is trying to guess
let nextAnswer = ""; // next answer to be retrieved from api
let message = "Guess the word!"; // message displayed to user
let disabled = false; // controls whether user can submit or not
let isSane = false; // controls when game is completed
let score = 0; // number of correct guesses
let sanity = 5; // amount of sanity
let wrong = 0; // number of wrong guesses

app.get("/wrong", (req, res) => {
  res.send(`${wrong}`);
});

// increments wrong if answer is incorrect, resets wrong if special string is passed
app.post("/wrong", (req, res) => {
  let temp = req.body.guessedWord;
  if (temp === "big chungus the greatest of them all!") {
    wrong = 0;
  } else if (temp !== answer) {
    wrong = wrong + 1;
  }
  res.send(`${wrong}`);
});

app.get("/score", (req, res) => {
  res.send(`${score}`);
});

// increments score if answer is correct, resets count if special string is passed
app.post("/score", (req, res) => {
  let temp = req.body.guessedWord;
  if (temp === "big chungus the greatest of them all!") {
    score = 0;
  }
  if (temp === answer) {
    score = score + 1;
  }
  res.send(`${score}`);
});

app.get("/sanity", (req, res) => {
  res.send(`${sanity}`);
});

// increments sanity by random number between 1 and 20 inclusive when correct answer is given
// decrements sanity by 1 if incorrect answer is given
app.post("/sanity", (req, res) => {
  let temp = req.body.guessedWord;
  if (temp === answer) {
    sanity = sanity + (Math.floor(Math.random() * 20) + 1);
    if (sanity > 99) {
      sanity = 100;
    }
  } else if (temp === "big chungus the greatest of them all!") {
    sanity = 5;
  } else {
    sanity = sanity - 1;
    if (sanity < 0) {
      sanity = 0;
    }
  }
  res.send(`${sanity}`);
});

app.get("/isSane", (req, res) => {
  res.send({ sanity: isSane });
});

// completes game if sanity is 100 or higher
app.post("/isSane", (req, res) => {
  let temp = req.body.sanity;
  isSane = temp > 99;
  res.send({ isSane: isSane });
});

app.get("/disabled", (req, res) => {
  res.send({ disable: disabled });
});

// disables submit button when correct answer is given
app.post("/disabled", (req, res) => {
  let temp = req.body.guessedWord;
  disabled = temp === answer;
  res.send({ disable: disabled });
});

app.get("/message", (req, res) => {
  res.send(message);
});

// sends user default message when new answer is retrieved
// sends user correct or incorrect message based on the guess
app.post("/message", (req, res) => {
  let temp = req.body.guessedWord;
  if (temp === "big chungus the greatest of them all!") {
    message = "Guess the word!";
    res.end(message);
  } else if (temp === answer) {
    message = "Good job! Click 'Guess new word' to keep guessing!";
  } else if (temp !== answer) {
    message = "Try again...";
  }
  res.send(message);
});

app.get("/guess", (req, res) => {
  res.send(guess);
});

app.post("/guess", (req, res) => {
  guess = req.body.guessedWord;
  res.send(guess);
});

app.get("/answer", (req, res) => {
  res.send(answer);
});

app.post("/answer", (req, res) => {
  answer = nextAnswer;
  res.send(answer);
});

app.get("/nextAnswer", (req, res) => {
  res.send(nextAnswer);
});

// retrieves next answer in advance to resolve loading errors when retrieving from api
app.post("/nextAnswer", (req, res) => {
  axios
    .request(config)
    .then((response) => {
      nextAnswer = response.data[0];
    })
    .catch((error) => {
      console.log(error);
    });
  res.send(nextAnswer);
});

app.get("/scrambled", (req, res) => {
  res.send(scramble(answer));
});

// scramble function
function scramble(word) {
  strarray = word.split("");
  var i, j, k;
  for (i = 0; i < strarray.length; i++) {
    j = Math.floor(Math.random() * i);
    k = strarray[i];
    strarray[i] = strarray[j];
    strarray[j] = k;
  }
  word = strarray.join("");
  return word;
}

// axios config to retrieve word from api
let config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://random-word-api.herokuapp.com/word",
  headers: {},
};

// initial api retrieval
axios
  .request(config)
  .then((response) => {
    answer = response.data[0];
  })
  .catch((error) => {
    console.log(error);
  });

// initial api retrieval for next answer
axios
  .request(config)
  .then((response) => {
    nextAnswer = response.data[0];
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
