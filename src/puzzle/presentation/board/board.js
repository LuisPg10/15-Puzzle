import html from './board.html?raw';
import './board.css';

import puzzleStore from '../../store/puzzle-store';
import { moveNumber } from '../../use-cases/index';
import { renderTime } from '../game-info/game-info';
import { gameModal } from '../game-modal/game-modal';

const elementsId = {
  Board: '#board',
  GameButton: '.game-button',
  Pause: '#pause',
  DivOverlay: '.div-overlay',
  PauseFaButton: '#continue',
};

/**
 * @type {HTMLDivElement}
 */
let numberPanel;

/**
 * @type {HTMLButtonElement}
 */
let pauseButton;

/**
 * Render the board element
 * @param {HTMLDivElement} element Place to render board
 */
export const board = (element) => {
  if (!element) throw new Error('element not found');

  const mainContent = document.createElement('main');
  mainContent.innerHTML = html;
  element.append(mainContent);

  numberPanel = document.querySelector(elementsId.Board);
  pauseButton = document.querySelector(elementsId.Pause);
  const pauseFaButton = document.querySelector(elementsId.PauseFaButton);

  renderSquares();

  numberPanel.addEventListener('click', moveEventListener);
  pauseButton.addEventListener('click', pauseEventListener);
  pauseFaButton.addEventListener('click', pauseEventListener);
};

/**
 * Event to move numbers across the board
 * @param {MouseEvent} event
 */
const moveEventListener = (event) => {
  const square = event.target.closest(elementsId.GameButton);
  if (!square) return;

  const emptySquare = [...numberPanel.children].find(
    (square) => square.innerText === ''
  );

  moveNumber(square, emptySquare);

  if (puzzleStore.getWonGame()) {
    puzzleStore.runTime(false);
    const main = numberPanel.parentElement;
    gameModal(main.parentElement);
  }
};

/**
 * @type {HTMLDivElement}
 */
let divOverlay;
const pauseEventListener = () => {
  if (!divOverlay) divOverlay = document.querySelector(elementsId.DivOverlay);

  if (pauseButton.innerHTML === 'Pause') {
    pauseButton.innerHTML = 'Play';
    divOverlay.style.visibility = 'visible';
    puzzleStore.runTime(false);
    return;
  }

  pauseButton.innerHTML = 'Pause';
  divOverlay.style.visibility = 'hidden';
  puzzleStore.runTime(true, renderTime);
};

export const renderSquares = () => {
  if (!numberPanel) throw new Error('numberPanel not found');

  puzzleStore.getNumbers().forEach((number, index) => {
    let square = numberPanel.children[index];

    if (!square) {
      square = document.createElement('div');
      square.classList.add('game-button');
      square.dataset.id = index;
      numberPanel.append(square);
    }
    square.innerText = number;

    if (+square.innerText === index + 1) {
      square.style.backgroundColor = 'orange';
    } else {
      square.style.backgroundColor = 'white';
    }
  });
};

export const togglePause = () => {
  pauseButton.disabled = !pauseButton.disabled;
  pauseButton.disabled
    ? (pauseButton.style.cursor = 'not-allowed')
    : (pauseButton.style.cursor = 'pointer');

  if (pauseButton.innerHTML === 'Play') {
    pauseButton.innerHTML = 'Pause';
    divOverlay.style.visibility = 'hidden';
  }
};
