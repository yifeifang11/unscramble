const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

let guess = "";
let answer = "";
let nextAnswer = "";
let message = "Guess the word!";
let disabled = false;
let isSane = false;
let score = 0;
let sanity = 5;
let wrong = 0;

app.get("/wrong", (req, res) => {
  res.send(`${wrong}`);
});

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

app.post("/isSane", (req, res) => {
  let temp = req.body.sanity;
  isSane = temp > 99;
  res.send({ isSane: isSane });
});

app.get("/disabled", (req, res) => {
  res.send({ disable: disabled });
});

app.post("/disabled", (req, res) => {
  let temp = req.body.guessedWord;
  disabled = temp === answer;
  res.send({ disable: disabled });
});

app.get("/message", (req, res) => {
  res.send(message);
});

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

let config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://random-word-api.herokuapp.com/word",
  headers: {},
};

axios
  .request(config)
  .then((response) => {
    answer = response.data[0];
  })
  .catch((error) => {
    console.log(error);
  });

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
