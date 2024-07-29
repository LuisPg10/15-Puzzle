import { startNewGame } from '../use-cases/index';

const state = {
  correctCount: 0,
  moves: 0,
  numbers: [],
  playedTime: 0,
  wonGame: false,
};

const newGame = () => {
  state.numbers = startNewGame();
  if (state.moves) state.moves = 0;
  if (state.playedTime) state.playedTime = 0;
  if (state.correctCount) state.correctCount = 0;
  if (state.wonGame) state.wonGame = false;

  state.numbers.forEach((number, index) => {
    if (+number === index + 1) state.correctCount++;
  });
};

/**
 * @type {NodeJS.Timeout}
 */
let timer;

/**
 *
 * @param {Boolean|undefined} run
 * @param {() => void} callback
 */
const runTime = (run = true, callback = undefined) => {
  if (run) {
    timer = setInterval(() => {
      ++state.playedTime;
      if (callback) callback();
    }, 1000);
    return;
  }
  clearInterval(timer);
};

const updateMovesCount = () => {
  state.moves++;
  if (state.correctCount == state.numbers.length - 1) state.wonGame = true;
};

const increaseCorrectCount = () => state.correctCount++;

const decreaseCorrectCount = () => state.correctCount--;

export default {
  /**
   *
   * @returns {Number}
   */
  getCorrectCount: () => state.correctCount,

  /**
   *
   * @returns {Array<String>}
   */
  getNumbers: () => [...state.numbers],

  /**
   *
   * @returns {Number}
   */
  getMoves: () => state.moves,

  /**
   *
   * @returns {Number}
   */
  getPlayedTime: () => state.playedTime,

  /**
   *
   * @returns {Boolean}
   */
  getWonGame: () => state.wonGame,

  decreaseCorrectCount,
  increaseCorrectCount,
  newGame,
  runTime,
  updateMovesCount,
};
