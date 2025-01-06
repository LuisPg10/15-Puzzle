import { gameInfo, board } from './presentation';
import puzzleStore from './store/puzzle-store';

/**
 * @type {HTMLButtonElement}
 */
let pauseButton;

/**
 *
 * @param {HTMLDivElement} element element to render the game
 */
export const PuzzleApp = (element) => {
  if (!element) throw Error('element not found');

  puzzleStore.newGame();

  // title game
  const title = document.createElement('h1');
  title.innerHTML = '15 Puzzle';
  element.append(title);

  // game content
  const main = document.createElement('main');
  element.append(main);
  gameInfo(main);
  board(main);

  pauseButton = document.createElement('button');
  pauseButton.id = 'pause';
  pauseButton.disabled = true;
  pauseButton.innerHTML = 'Pause';
  main.append(pauseButton);

  // footer
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <p>This game is ispiraded in 
      <a href="https://15puzzle.netlify.app/" target="_blank"> 
        15 Puzzle
      </a> 
      created by Shubham Singh and it took 
      as practice for web programming subject
    </p>
  `;
  element.append(footer);
};
