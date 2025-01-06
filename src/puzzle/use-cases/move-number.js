import { renderMoves, renderTime } from '../presentation/game-info/game-info';
import { togglePause } from '../presentation';
import puzzleStore from '../store/puzzle-store';

/**
 *
 * @param {HTMLDivElement} square Square where is the number
 * @param {HTMLDivElement} emptySquare Square where the number will be moved
 */
export const moveNumber = (square, emptySquare) => {
  const emptySquareIndex = +emptySquare.dataset.id;
  const squareIndex = +square.dataset.id;
  const rowDiff = Math.abs(
    Math.floor(emptySquareIndex / 4) - Math.floor(squareIndex / 4)
  );
  const colDiff = Math.abs((emptySquareIndex % 4) - (squareIndex % 4));

  // Check if the square is adjacent to the empty square
  if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
    // Swap the empty square with the clicked square
    emptySquare.innerText = square.innerText;
    square.textContent = '';

    if (+emptySquare.innerText === emptySquareIndex + 1) {
      emptySquare.style.backgroundColor = 'orange';
      puzzleStore.increaseCorrectCount();
    }

    if (square.style.backgroundColor === 'orange') {
      square.style.backgroundColor = 'white';
      puzzleStore.decreaseCorrectCount();
    }

    puzzleStore.updateMovesCount();
    renderMoves();

    if (puzzleStore.getMoves() === 1) {
      puzzleStore.runTime(true, renderTime);
      togglePause();
    }
  }
};
