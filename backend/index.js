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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let count = 0;
let guess = "";
let answer = "";
let nextAnswer = "";
let message = "Guess the word";
let disabled = false;
let isSane = false;
let score = 0;
let sanity = 5;

app.get("/score", (req, res) => {
  res.send(`${score}`);
});

app.post("/score", (req, res) => {
  let temp = req.body.guessedWord;
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
    // sanity = sanity + (Math.floor(Math.random() * 20) + 1);
    sanity = sanity + 60;
  } else {
    sanity = sanity - 1;
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

app.get("/count", (req, res) => {
  res.send(`${count}`);
});

app.post("/count", (req, res) => {
  count = req.body.count;
  res.send(`${count}`);
});

app.get("/message", (req, res) => {
  res.send(message);
});

app.post("/message", (req, res) => {
  let temp = req.body.guessedWord;
  if (temp === "big chungus the greatest of them all!") {
    message = "Guess the word";
    res.end(message);
  } else if (temp === answer) {
    message = "Good job";
  } else if (temp !== answer) {
    message = "Try again";
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
