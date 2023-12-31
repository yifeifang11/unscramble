# EKREB

### Features of the game

The user guesses scrambled words by inputting guesses in a text box. When they make a correct guess, Ekreb's sanity will increase by a random amount within a range (1-20), and if they make an incorrect guess, sanity will decrease by one. The goal of the game is to make Ekreb's sanity reach 100 so he can unscramble his own name.

There are a few extra features beyond the minimum requirement, such as hints (giving the first and last letter of the scrambled word), sound effects, and sanity count (a way to keep score). When the user reaches 100, they will win the game, and the user has the option to reset. If the user cannot guess a word, they can rescramble the word, or they can retrieve a new word at no cost to sanity. Sanity will not become negative.

### Installation

After cloning the project, make sure to run 'npm install' in both the frontend and backend folders. To run the backend, run 'rpm run dev' and to run the frontend, run 'rpm run start'. Make sure the backend url is correct when running the frontend. If it is not, you can replace each instance of the current url with find and replace.

See the project live here: https://ekreb.onrender.com. If the backend does not load, please refresh the page a few times and wait a couple of minutes.

### Reflection

The frontend was built with React, which I have had experience in before. The backend was built with Express, which was a completely new framework to me. I learned with YouTube videos about Node, Express, and rest APIs. The biggest issues I had were understanding how to send data from the frontend to backend and vice versa and writing correct backend code that would properly handle requests.

I built an almost functional game before coming across issues with updating variables due to a poorly written backend. I rewrote most of my backend and frontend requests using the fetch API instead of axios. I believe I could have written more compact backend code by handling many post requests with just a single post request, which is something I will keep in mind as I do more backend and API stuff. Since this was my first time with backend and connecting backend to frontend, my code is likely a bit unorganized and redundant.