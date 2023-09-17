const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // for front end communication with backend

let score = 0;
let data = '';
let guess = '';

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://random-word-api.herokuapp.com/word',
  headers: { },
  data : data
};

axios.request(config)
.then((response) => {
  data = JSON.stringify(response.data).slice(2, JSON.stringify(response.data).length-2);
})
.catch((error) => {
  console.log(error);
});

app.get('/score', (req, res) => {
    res.send(`${score}`);
});

app.patch('/score', (req, res) => {
    score += parseInt(req.query.val);
    res.status(200).send(`${score}`);
}); // patch might be used to send guess of word with status codes

app.get('/word', (req, res) => {
    res.send(scramble(data));
});

app.get('/answer', (req, res) => {
  res.send(data);
})

function scramble(word) {
    strarray = word.split('');           
    var i,j,k
    for (i = 0; i < strarray.length; i++) {
      j = Math.floor(Math.random() * i)
      k = strarray[i]
      strarray[i] = strarray[j]
      strarray[j] = k
    }
    word = strarray.join('');  
    return word;
  }

app.get('/guess', (req, res) => {
    res.send(guess);
});

app.patch('/guess', (req, res) => {
    guess = req.query.guess;
    res.status(200).send(guess);
});

app.listen(PORT, () => {
    console.log(`Backend is running on http://localhost:${PORT}`);
});