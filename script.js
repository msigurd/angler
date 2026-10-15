import { randomInt } from './javascript/helpers.js';
import { drawAngleOnSvg } from './javascript/painter.js';

const [RADIUS, LINE_LENGTH] = [50, 85];
const [MIN_GUESS, MAX_GUESS] = [5, 355];
const MAX_GUESSES = 5;
const MAIN_EL = document.querySelector('main');
const ANGLE_SVG = document.getElementById('angle');
const GUESS_FIELDSET = document.getElementById('guess-fieldset');
const GUESS_INPUT = document.getElementById('guess-input');
const SUBMIT_BTN = document.getElementById('submit-btn');
const GUESSES_EL = document.getElementById('guesses');
const CORRECT_ANGLE_EL = document.getElementById('response-incorrect__correct-angle');
const PLAY_AGAIN_BTN = document.getElementById('play-again');

let angle;
let guesses = [];

initialize();

function initialize() {
  angle = randomAngle();
  CORRECT_ANGLE_EL.innerText = String(angle);
  drawAngle(angle);
}

function drawAngle(angle) {
  drawAngleOnSvg(ANGLE_SVG, angle, RADIUS, LINE_LENGTH);
}

function randomAngle() {
  return MIN_GUESS + randomInt(MAX_GUESS + 1 - MIN_GUESS);
}

function submit() {
  if (isMaxGuessesReached()) return;

  const guess = Number(GUESS_INPUT.value);

  if (!isValidGuess(guess)) return;
  if (isAlreadyGuessed(guess)) {
    showAlreadyGuessed();
    return;
  }

  guesses.push(guess);
  incrementTotalGuesses();

  if (guess === angle) {
    setState('correct');
    disableGuess();
    showPlayAgain();
  } else if (isMaxGuessesReached()) {
    setState('incorrect');
    disableGuess();
    showPlayAgain();
  } else if (guess > angle) {
    setState('too-high');
  } else if (guess < angle) {
    setState('too-low');
  }
}

function incrementTotalGuesses() {
  GUESSES_EL.innerText = String(guesses.length);
}

function setState(state) {
  MAIN_EL.className = state;
}

function clearState() {
  setState('');
}

function isValidGuess(guess) {
  return guess >= MIN_GUESS && guess <= MAX_GUESS && Number.isInteger(guess);
}

function isAlreadyGuessed(guess) {
  return guesses.includes(guess);
}

function isMaxGuessesReached() {
  return guesses.length >= MAX_GUESSES;
}

function showPlayAgain() {
  PLAY_AGAIN_BTN.hidden = false;
}

function showAlreadyGuessed() {
  setState('already-guessed');
  setTimeout(clearState, 3000);
}

function disableGuess() {
  GUESS_FIELDSET.disabled = true;
}

GUESS_INPUT.addEventListener('keydown', event => {
  if (event.key === 'Enter') submit();
});
SUBMIT_BTN.addEventListener('click', submit);
