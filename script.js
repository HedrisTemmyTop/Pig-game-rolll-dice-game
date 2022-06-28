'use strict';
const rollDice = document.querySelector('.btn--roll');
const player1CurrentScore = document.querySelector('.current-score');
const dice = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

let activePlayer;
let currentScore;
let playerScore;
let playing;
let scores;
const init = function () {
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  player1CurrentScore.textContent = 0;
  dice.classList.add('hidden');
};
init();

const generateRandom = function (min, max) {
  const randomNumber = Math.trunc(Math.random() * (max - min + 1) + min);

  return randomNumber;
  //   console.log(randomNumber);
};

// generateRandom(1, 6);
// let currentScore = 0;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  //   document.getElementById(`score--${activePlayer}`).textContent = 0;

  //   player1CurrentScore.textContent = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// switchPlayer()

rollDice.addEventListener('click', function () {
  if (playing) {
    const random = generateRandom(1, 6);

    dice.src = `dice-${random}.png`;
    dice.classList.remove('hidden');
    if (random > 1) {
      currentScore += random;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      console.log(random);
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // currentScore = 0;
    if (scores[activePlayer] >= 10) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      dice.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
});
