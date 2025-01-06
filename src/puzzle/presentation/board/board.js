import html from './board.html?raw';
import './board.css';

import puzzleStore from '../../store/puzzle-store';
import { moveNumber } from '../../use-cases';
import { gameModal, pauseEventListener } from '../';

const elementsId = {
  Board: '#board',
  Pause: '#pause',
  PauseFaButton: '#continue',
};

/**
 * @type {HTMLDivElement}
 */
export let numberPanel;

/**
 * Render the board element
 * @param {HTMLDivElement} element Place to render board
 */
export const board = (element) => {
  if (!element) throw new Error('element not found');

  const mainContent = document.createElement('section');
  mainContent.classList.add('game-board');
  mainContent.innerHTML = html;
  element.append(mainContent);

  numberPanel = document.querySelector(elementsId.Board);
  const pauseFaButton = document.querySelector(elementsId.PauseFaButton);

  renderSquares();

  numberPanel.addEventListener('click', moveEventListener);
  pauseFaButton.addEventListener('click', pauseEventListener);
};

/**
 * Event to move numbers across the board
 * @param {MouseEvent} event
 */
const moveEventListener = (event) => {
  const square = event.target.closest('div');
  if (!square) return;

  const emptySquare = [...numberPanel.children].find(
    (square) => square.innerText === ''
  );

  moveNumber(square, emptySquare);
  puzzleStore.runTime(false);

  if (puzzleStore.getWonGame()) {
    const main = numberPanel.parentElement;
    gameModal(main.parentElement);
  }
};

export const renderSquares = () => {
  if (!numberPanel) throw new Error('numberPanel not found');

  puzzleStore.getNumbers().forEach((number, index) => {
    let square = numberPanel.children[index];

    if (!square) {
      square = document.createElement('div');
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
