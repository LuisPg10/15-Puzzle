import './game-info.css';
import puzzleStore from '../../store/puzzle-store';
import { renderSquares, togglePause } from '../board/board';

const elementsId = {
  NewButton: '#new',
  Moves: '.moves',
  Counter: '#counter',
};

/**
 *
 * @param {HTMLDivElement} element
 */
export const gameInfo = (element) => {
  if (!element) throw new Error('element not found');

  const info = document.createElement('div');
  info.classList.add('game-info');
  info.innerHTML = `
    <button id="new" class="button">new game</button>
    <div class="labels">
      <h3>TIME</h3>
      <h3>MOVES</h3>
      <h2><span id="counter">0</span>s</h2>
      <h2 class="moves">0</h2>
    </div>
  `;

  element.append(info);

  const newGameButton = document.querySelector(elementsId.NewButton);
  newGameButton.addEventListener('click', newGameEventListener);
};

export const newGameEventListener = () => {
  if (puzzleStore.getMoves()) {
    puzzleStore.runTime(false);
    togglePause();
  }
  puzzleStore.newGame();
  renderSquares();
  renderMoves();
  renderTime();
};

/**
 * @type {HTMLHeadingElement}
 */
let moves;
export const renderMoves = () => {
  if (!moves) moves = document.querySelector(elementsId.Moves);
  moves.innerHTML = puzzleStore.getMoves();
};

/**
 * @type {HTMLSpanElement}
 */
let time;
export const renderTime = () => {
  if (!time) time = document.querySelector(elementsId.Counter);
  time.innerHTML = puzzleStore.getPlayedTime();
};
