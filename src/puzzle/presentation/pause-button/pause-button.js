import puzzleStore from '../../store/puzzle-store';
import { renderTime } from '../';

let pauseBtn;

/**
 *
 * @param {HTMLElement} element
 */
export const pauseButton = (element) => {
  if (!element) throw new Error('element not found');

  pauseBtn = document.createElement('button');
  pauseBtn.id = 'pause';
  pauseBtn.disabled = true;
  pauseBtn.innerHTML = 'Pause';
  pauseBtn.addEventListener('click', pauseEventListener);

  element.append(pauseBtn);
};

/**
 * @type {HTMLDivElement}
 */
let divOverlay;
export const pauseEventListener = () => {
  if (!divOverlay) divOverlay = document.querySelector('.div-overlay');

  if (!puzzleStore.getPauseState()) {
    pauseBtn.innerHTML = 'Play';
    divOverlay.hidden = false;
    puzzleStore.runTime(false);
    puzzleStore.changePauseState(true);
    return;
  }

  pauseBtn.innerHTML = 'Pause';
  divOverlay.hidden = true;
  puzzleStore.runTime(true, renderTime);
  puzzleStore.changePauseState(false);
};

export const togglePause = () => {
  pauseBtn.disabled = !pauseBtn.disabled;
  pauseBtn.disabled
    ? (pauseBtn.style.cursor = 'not-allowed')
    : (pauseBtn.style.cursor = 'pointer');

  if (puzzleStore.getPauseState()) {
    pauseBtn.innerHTML = 'Pause';
    divOverlay.hidden = true;
    puzzleStore.changePauseState(false);
  }
};
