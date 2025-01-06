import './game-modal.css';
import { newGameEventListener } from '../game-info/game-info';
import puzzleStore from '../../store/puzzle-store';

const elementsClassIds = {
  Accept: '.accept',
};

/**
 *
 * @param {HTMLDivElement} element
 */
export const gameModal = (element) => {
  if (!element) throw new Error('element not found');

  const dialog = document.createElement('dialog');
  dialog.classList.add('winner');

  const message = `
    <div>
      <h2>Excelent</h2>
      <p>You won with ${puzzleStore.getMoves()} moves</p>
      <button class="accept">Play again</button>
    </div>
  `;

  dialog.innerHTML = message;
  element.append(dialog);

  const playAgain = document.querySelector(elementsClassIds.Accept);
  playAgain.addEventListener('click', () => {
    newGameEventListener();
    dialog.remove();
  });

  dialog.showModal();
};
